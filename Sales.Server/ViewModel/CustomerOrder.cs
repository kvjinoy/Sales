using Sales.Service.Domain;

namespace Sales.Server.ViewModel
{
    public class CustomerOrder
    {
        public int OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public required Customer Customer { get; set; }
        public required IEnumerable<OrderProduct> OrderItems { get; set; }
        public double Total { get; set; }
    }
}
