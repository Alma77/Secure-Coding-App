namespace GalleryAPI.Models
{
    public class SessionData
    {
        public int Id { get; set; }
        public string SessionId { get; set; } = string.Empty;
        public User User { get; set; } = new User();
    }
}
