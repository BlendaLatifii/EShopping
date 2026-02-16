namespace Application.DTO.Response
{
    public class DailySalesDto
    {
        public DateTime Date { get; set; }
        public decimal TotalSales { get; set; }
        public int OrdersCount { get; set; }
    }

}
