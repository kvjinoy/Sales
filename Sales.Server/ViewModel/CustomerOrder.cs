﻿using Sales.Service.Domain;

namespace Sales.API.ViewModel
{
    public class CustomerOrder
    {
        public int OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public required Customer Customer { get; set; }
        public required IEnumerable<OrderItem> OrderItems { get; set; }
        public double Total { get; set; }
    }
}
