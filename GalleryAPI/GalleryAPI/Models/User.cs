using System.Text.RegularExpressions;

namespace GalleryAPI.Models
{
    public class User
    {
        public readonly int Id;
        public readonly Username Name;
        public readonly string Password;
        public readonly string Salt;

        public User(Username name, string password, string salt)
        {
            if(name != null && name.GetValue().Trim() != string.Empty)
                Name = new Username(name.GetValue());
            else
                throw new ArgumentException();
            if(password != null && password.Trim() != string.Empty)
                Password = password;
            else
                throw new ArgumentNullException();
            if(salt != null && salt.Trim() != string.Empty)
                Salt = salt;
            else
                throw new ArgumentNullException();
        }
    }

    public class Username
    { 
        private readonly static string VALID_CHARACTERS = "[A-Za-z0-9_-]+";

        private readonly string value;

        public Username(string value)
        {
            string trimmed = value.Trim();
            if(Regex.IsMatch(trimmed, VALID_CHARACTERS))
            {
                this.value = trimmed;
            }
            else
            {
                throw new Exception("Username can only contain A-Z, a-z, or 0-9 characters");
            }
        }

        public string GetValue()
        {
            return value;
        }
    }

}
