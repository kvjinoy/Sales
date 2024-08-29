using Sales.Service.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Service
{
    public interface IProductService
    {
        void AddProduct(Product product);
        Task<IEnumerable<Product>> GetProducts();
    }
}
