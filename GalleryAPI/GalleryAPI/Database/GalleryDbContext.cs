using Microsoft.EntityFrameworkCore;
using GalleryAPI.Models;

namespace GalleryAPI.Database
{
    public class GalleryDbContext : DbContext
    {
        public GalleryDbContext(DbContextOptions<GalleryDbContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<User>? Users { get; set; }
        public DbSet<SessionData>? Sessions { get; set; }
    }
}
