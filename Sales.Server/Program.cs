using Microsoft.Extensions.Configuration;
using Sales.Service;
//using System.Configuration;
using System.Data;
using System.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
var supportedOrigin = "https://localhost:5173";

// Add services to the container.

ConfigureServices(builder);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins(supportedOrigin);
                      });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(myAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

void ConfigureServices(WebApplicationBuilder builder)
{
    IServiceCollection services = builder.Services;
    var connectionString =  builder.Configuration.GetConnectionString("DefaultConnection");
    
    services.AddScoped<IDbConnection>(sp =>new SqlConnection(connectionString));
    services.AddScoped<IProductService, ProductService>();
    services.AddScoped<ICustomerService, CustomerService>();
    services.AddScoped<IOrderService, OrderService>();
}
