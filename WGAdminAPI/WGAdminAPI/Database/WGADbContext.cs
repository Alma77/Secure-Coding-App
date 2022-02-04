using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WGAdminAPI.Models;


namespace WGAdminAPI.Database
{
    public class WGADbContext : DbContext
    {
        public WGADbContext(DbContextOptions<WGADbContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Client> Clients { get; set;  }
    }
}
