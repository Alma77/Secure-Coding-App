using Microsoft.EntityFrameworkCore;
using GalleryAPI.Models;

namespace GalleryAPI.Database
{
    public class GalleryDbContext : DbContext
    {
        public GalleryDbContext(DbContextOptions<GalleryDbContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<UserDTO>? Users { get; set; }
        public DbSet<SessionData>? Sessions { get; set; }
        public DbSet<CommentDTO>? Comments { get; set; }
    }
}
