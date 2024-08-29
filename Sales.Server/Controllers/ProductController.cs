using Microsoft.AspNetCore.Mvc;
using Sales.Service;
using Sales.Service.Domain;


namespace Sales.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/<ProductController>
        [HttpGet]
        public async Task<IEnumerable<Product>> Get()
        {
            return await _productService.GetProducts();
        }

        // POST api/<ProductController>
        [HttpPost]
        public void Post([FromBody] Product product)
        {
             _productService.AddProduct(product);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Product product)
        {
            throw new NotImplementedException();
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
