using Microsoft.AspNetCore.Mvc;
using Sales.API.ViewModel;
using Sales.Service;
using Sales.Service.Domain;

namespace Sales.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            throw new NotImplementedException();
        }

        // POST api/<OrderController> //
        [HttpPost]
        public void Post([FromBody] CustomerOrder customerOrder)
        {
            _orderService.CreateOrder(customerOrder.Customer, customerOrder.OrderItems);
        }


        // GET: api/<OrderController>
        [HttpGet]
        public async Task<IEnumerable<CustomerOrder>> Get()
        {
            var orderdata = await _orderService.GetAllOrders();
            return GetCustomerOrderData(orderdata);
        }

        private IEnumerable<CustomerOrder> GetCustomerOrderData((IEnumerable<Customer> customers, IEnumerable<Order> orders, IEnumerable<OrderProduct> orderItems) orderdata)
        {
            var customerOrders = new List<CustomerOrder>();
            foreach (var order in orderdata.orders)
            {
                var customer = orderdata.customers.FirstOrDefault(c => c.Id == order.CustomerId);
                var orderItems = orderdata.orderItems.Where(oi => oi.OrderId == order.Id).ToList();
                var orderTotal = orderItems.Sum(oi => oi.Price);

                var customerOrder = new CustomerOrder()
                {
                    OrderId = order.Id,
                    Customer = customer,
                    OrderItems = orderItems,
                    OrderDate = order.Date,
                    Total = orderTotal,
                };
                customerOrders.Add(customerOrder);
            }

            return customerOrders;
        }

    }
}
