using Sales.Service.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Service
{
    public interface IOrderService
    {
        Order CreateOrder(Customer customer, IEnumerable<OrderProduct> orderItems);
        Task<(IEnumerable<Customer> customers, IEnumerable<Order> orders, IEnumerable<OrderProduct> orderItems)> GetAllOrders();
    }
}
