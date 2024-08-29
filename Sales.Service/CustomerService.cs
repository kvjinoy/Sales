using Sales.Service.Domain;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace Sales.Service
{
    public class CustomerService : ICustomerService
    {

        private readonly IDbConnection _connection;

        public CustomerService(IDbConnection connection)
        {
            _connection = connection;
        }

        public void AddCustomer(Customer customer)
        {

            var sql = @"INSERT INTO [dbo].[Customer] ([FirstName],[LastName],[Email],[Phone]) 
                        OUTPUT INSERTED.Id
                        VALUES  (@FirstName, @LastName,@Email,@Phone)";

            var id = _connection.QuerySingle<int>(sql, customer);
            customer.Id = id;

        }
    }
}
