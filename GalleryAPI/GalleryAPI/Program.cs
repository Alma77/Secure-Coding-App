using Microsoft.EntityFrameworkCore;
using GalleryAPI.Database;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<GalleryDbContext>(options => options.UseNpgsql("host=192.168.48.4; password=R3nnat77; database=postgres; user id=postgres;"));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddCookie()
.AddJwtBearer(options =>
{
    options.Audience = "1ce419d8-9475-4d32-a8db-ad18b6338b4a";
    options.Authority = "https://login.microsoftonline.com/consumers/";
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidAudience = "1ce419d8-9475-4d32-a8db-ad18b6338b4a",
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidIssuers = new List<string>() { "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0", "login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0" }
    };
});

var app = builder.Build();
using(var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<GalleryDbContext>();
    //db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthorization();

app.MapControllers();

app.Run();
