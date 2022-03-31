using Microsoft.EntityFrameworkCore;
using GalleryAPI.Database;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.Logging;


var builder = WebApplication.CreateBuilder(args);

IdentityModelEventSource.ShowPII = true;

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
    options.Authority = "https://login.microsoftonline.com/consumers/v2.0/";
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidAudience = "1ce419d8-9475-4d32-a8db-ad18b6338b4a",
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidIssuer = "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",
    };

    options.Events = new JwtBearerEvents()
    {
        OnAuthenticationFailed = c =>
        {
            Console.WriteLine("Authentication failure");
            Console.WriteLine(c.Exception);

            c.NoResult();

            c.Response.StatusCode = 500;
            c.Response.ContentType = "text/plain";

            return c.Response.WriteAsync(c.Exception.ToString());
        }
    };
});

var app = builder.Build();
using(var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<GalleryDbContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
