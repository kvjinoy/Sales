using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Sales.Service.Domain
{
    public class OrderItem
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public int OrderId { get; set; }

        [Range (1, int.MaxValue, ErrorMessage ="Invalid Product")]
        public int ProductId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Invalid Quantity")]
        public int Quantity { get; set; }

        [Range(1, double.MaxValue, ErrorMessage = "Invalid Price")]
        public double Price { get; set; }
    }
}
