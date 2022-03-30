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
        public IPAddress IpAddress { get; set; }
        public DateTime DateAdded { get; set; }
        public string IpRange { get; set;  }
        public string PublicKey { get; set;  }
        public string PrivateKey { get; set; }
    }

    public class IPAddress
    {
        private readonly string _value;

        public IPAddress(string value)
        {
            if (value == null)
            {
                _value = "";
            }

            if (System.Net.IPAddress.TryParse(value, out _))
            {
                _value = value;
            }
            else
            {
                _value = "";
            }
        }

        public string GetValue()
        {
            return _value;
        }
    }
}
