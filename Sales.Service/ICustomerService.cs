using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sales.Service.Domain;

namespace Sales.Service
{
    public interface ICustomerService
    {
        void AddCustomer(Customer cusomer);
    }
}
