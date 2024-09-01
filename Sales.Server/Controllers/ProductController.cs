using Microsoft.AspNetCore.Mvc;
using Sales.Service;
using Sales.Service.Domain;


namespace Sales.API.Controllers
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


        [HttpGet]
        public async Task<IEnumerable<Product>> Get()
        {
            return await _productService.GetProducts();
        }


        [HttpPost]
        public void Post([FromBody] Product product)
        {
            _productService.AddProduct(product);
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Product product)
        {
            throw new NotImplementedException();
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
