using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using Moq;
using Sales.Service;
using Sales.Service.Domain;
using Xunit;

namespace Sales.Service.Tests
{
    public class OrderServiceTests
    {
        private readonly Mock<IDbConnection> _mockDbConnection;
        private readonly Mock<ICustomerService> _mockCustomerService;
        private readonly OrderService _orderService;

        public OrderServiceTests()
        {
            _mockDbConnection = new Mock<IDbConnection>();
            _mockCustomerService = new Mock<ICustomerService>();
            _orderService = new OrderService(_mockDbConnection.Object, _mockCustomerService.Object);
        }

        [Fact(Skip = "todo")]
        public void CreateOrder_ShouldCallCorrectMethods()
        {

            var customer = new Customer { Id = 1, FirstName="First", LastName="Last" };
            var orderItems = new List<OrderItem>
            {
                new OrderItem { OrderId = 1, ProductId = 1, Quantity = 1, Price = 10},
                new OrderItem { OrderId = 2, ProductId = 2, Quantity = 2, Price = 20 }
            };

            _orderService.CreateOrder(customer, orderItems);

       }
    }
}