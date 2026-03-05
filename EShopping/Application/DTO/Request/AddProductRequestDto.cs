using Microsoft.AspNetCore.Http;

namespace Application.DTO.Request
{
    public class AddProductRequestDto
    {
        public List<IFormFile> Images { get; set; } = new List<IFormFile>();
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public Guid CategoryId { get; set; }
    }
}
