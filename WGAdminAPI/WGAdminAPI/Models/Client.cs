using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WGAdminAPI.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IpAddress { get; set; }
        public DateTime DateAdded { get; set; }
        public string IpRange { get; set;  }
        public string PublicKey { get; set;  }
        public string PrivateKey { get; set; }
    }
}
