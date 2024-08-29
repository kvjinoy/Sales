using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Service.Domain
{
    public class Product
    {
            public int Id { get; set; }
            public required string Name { get; set; }
            public required string Type { get; set; }
            public double Price { get; set; }
        }
    }
