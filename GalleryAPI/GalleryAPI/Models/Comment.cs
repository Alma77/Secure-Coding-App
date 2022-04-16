namespace GalleryAPI.Models
{
    public class Comment
    {
        public Content Content { get; set; } = new Content(string.Empty);
        public Username Username { get; set; } = new Username("Anonymous");

        public Comment(CommentDTO comment)
        {
            Content = new Content(comment.Content);
            Username = new Username(comment.Username);
        }
    }

    public class Content
    {
        private readonly int MAX_LENGTH = 500;
        private readonly char[] INVALID_CHARACTERS = new char[] { '<', '>', '/' };
        private readonly string value;

        public Content(string value)
        {
            if(value.Length > MAX_LENGTH)
            {
                throw new ArgumentException("Comment exceeds max length!");
            }

            foreach (char c in INVALID_CHARACTERS)
            {
                if(value.ToLower().Contains(c))
                {
                    throw new ArgumentException("Comment has possibly malicious characters!");
                }
            }

            this.value = value;
        }

        public string GetValue()
        {
            return value;
        }
    }
}
