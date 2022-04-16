namespace GalleryAPI.Models
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Content { get; set; } = String.Empty;
        public string Username { get; set; } = "Anonymous";
    }
}
