namespace GalleryAPI.Models
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;
        public string? Salt { get; set; } = string.Empty;

        public string? ProfileImage { get; set; } = string.Empty;

    }
}
