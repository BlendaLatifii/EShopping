namespace Application.DTO.Response
{
    public class ProductAndCategory
    {
        public Guid CategoryId { get; set; }
        public int NumberOfProducts { get; set; }
        public string CategoryName { get; set; }
    }
}
