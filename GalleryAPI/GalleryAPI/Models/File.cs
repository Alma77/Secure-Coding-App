namespace GalleryAPI.Models
{
    public class File
    {
        public string Name { get; set; } = String.Empty;
        public string Extension { get; set; } = String.Empty;

        public File(string name, string extension)
        {
            Name = name;
            Extension = extension;
        }
    }
}
