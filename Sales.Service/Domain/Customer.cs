using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Service.Domain
{
    public class Customer
    {
            public int Id { get; set; }

            [Required(ErrorMessage = "First Name Required")]
            [StringLength(50)]
            [Display(Name = "First Name")]
            public required string FirstName { get; set; }

            [Required(ErrorMessage = "Last Name Required")]
            [StringLength(50)]
            [Display(Name = "Last Name")]
            public required string LastName { get; set; }

            [EmailAddress(ErrorMessage = "Invalid Email Address")]
            public string? Email { get; set; }

            [Phone(ErrorMessage = "Invalid Phone")]
            public string? Phone { get; set; }
    }
}
