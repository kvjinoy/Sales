using Dapper;
using Sales.Service.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Service
{
    public class OrderService : IOrderService
    {

        private readonly IDbConnection _connection;
        private readonly ICustomerService _customerService;

        public OrderService(IDbConnection connection, ICustomerService customerService)
        {
            _connection = connection;
            _customerService = customerService;
        }
        public async Task<(IEnumerable<Customer>, IEnumerable<Order>, IEnumerable<OrderItem>)> GetAllOrders()
        {
                using (var multi = await _connection.QueryMultipleAsync(@"
                    SELECT * FROM [dbo].[Customer];
                    SELECT * FROM [dbo].[Order];
                    SELECT * FROM [dbo].[OrderItem];"))
                {
                    var customers = await multi.ReadAsync<Customer>();
                    var orders = await multi.ReadAsync<Order>();
                    var orderItems = await multi.ReadAsync<OrderItem>();

                    return (customers, orders, orderItems);
                }
        }

        public void CreateOrder(Customer customer, IEnumerable<OrderItem> orderItems)
        {
            //Trasactions
            _customerService.AddCustomer(customer);
            var order = CreateOrderEntry(customer);
            CreateOrderItems(order, orderItems);
        }

        private Order CreateOrderEntry(Customer customer)
        {
            var order = new Order();
            order.CustomerId = customer.Id;

            var sql = @"INSERT INTO [dbo].[Order] ([CustomerId])  
                        OUTPUT INSERTED.Id VALUES (@CustomerId)";

            var id = _connection.QuerySingle<int>(sql, order);
            order.Id = id;
            return order;
        }


        private void CreateOrderItems(Order order, IEnumerable<OrderItem> orderItems)
        {
            foreach (var orderItem in orderItems)
            {
                orderItem.OrderId = order.Id;
                CreateOrderItem(orderItem);
            }
        }

        private void CreateOrderItem(OrderItem orderItem)
        {
            var sql = @"INSERT INTO [dbo].[OrderItem]
           ([OrderId],[ProductId],[Quantity] ,[Price]) VALUES
           (@OrderId,@ProductId,@Quantity,@Price)";

            _connection.Execute(sql, orderItem);
        }
    }
}
