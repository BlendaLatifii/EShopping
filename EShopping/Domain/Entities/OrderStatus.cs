namespace Domain.Entities
{
    public class OrderStatus
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool DefaultStatus { get; set; }
    }
}
