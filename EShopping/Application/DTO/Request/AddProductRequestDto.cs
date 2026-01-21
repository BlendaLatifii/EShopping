using Microsoft.AspNetCore.Http;

namespace Application.DTO.Request
{
    public class AddProductRequestDto
    {
        public List<IFormFile> Images { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public Guid CategoryId { get; set; }
    }
}
