using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Service.Domain
{
    public class Customer
    {
            public int Id { get; set; } 
            public required string FirstName { get; set; }
            public required string LastName { get; set; }
            public string? Email { get; set; }
            public string? Phone { get; set; }
    }
}
