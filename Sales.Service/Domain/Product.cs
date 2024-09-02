using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Service.Domain
{
    public class Product
    {
            public int Id { get; set; }

            [Required(ErrorMessage = "Product Name Required")]
            [StringLength(100)]
            public required string Name { get; set; }

            [Required(ErrorMessage = "Product Type/Size Required")]
            [StringLength(20)] public required string Type { get; set; }


            [Range(1, double.MaxValue, ErrorMessage = "Invalid Price")]
            public double Price { get; set; }
        }
    }
