using Xunit;
using Moq;
using Sales.Service;
using Sales.API.ViewModel;
using Sales.Service.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sales.API.Controllers;

namespace Sales.API.Test
{
    public class OrderControllerTests
    {
        private readonly Mock<IOrderService> _orderServiceMock;
        private readonly OrderController _orderController;

        public OrderControllerTests()
        {
            _orderServiceMock = new Mock<IOrderService>();
            _orderController = new OrderController(_orderServiceMock.Object);
        }

        [Fact]
        public void Post_ShouldCallCreateOrder()
        {

            var customerOrder = new CustomerOrder() 
            {   Customer=new Customer() { FirstName = "First", LastName="Last"},
                OrderItems = new List<OrderProduct>()
            };

            _orderController.Post(customerOrder);

            _orderServiceMock.Verify(service => service.CreateOrder(customerOrder.Customer, customerOrder.OrderItems), Times.Once);
        }

        [Fact]
        public async Task Get_ShouldReturnExpectedResult()
        {

            var customers = new List<Customer>();
            var orders = new List<Order>();
            var orderItems = new List<OrderProduct>();
            _orderServiceMock.Setup(service => service.GetAllOrders()).ReturnsAsync((customers, orders, orderItems));

            var result = await _orderController.Get();

            Assert.NotNull(result);
            _orderServiceMock.Verify(service => service.GetAllOrders(), Times.Once);
        }
    }
}