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
    public class ProductService : IProductService
    {

        private readonly IDbConnection _connection;

        public ProductService(IDbConnection connection)
        {
            _connection = connection;
        }

        public void AddProduct(Product product)
        {
            var sql = @"INSERT INTO [dbo].[Product] ([Name],[Type],[Price])
                     OUTPUT INSERTED.Id VALUES (@Name, @Type,@Price)";

            var id = _connection.QuerySingle<int>(sql, product);
            product.Id = id;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _connection.QueryAsync<Product>("SELECT * FROM Product");
        }
    }
}
