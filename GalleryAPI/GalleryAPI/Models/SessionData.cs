namespace GalleryAPI.Models
{
    public class SessionData
    {
        public int Id { get; set; }
        public string SessionId { get; set; } = string.Empty;
        public UserDTO User { get; set; } = new UserDTO();
    }
}
