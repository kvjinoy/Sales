using Sales.Service;
using System.Data;
using System.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
var supportedOrigins = "https://localhost:5173"; //todo override with config

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
                          policy.WithOrigins(supportedOrigins);
                          policy.WithHeaders(new[] { "X-Requested-With, Content-Type, Accept, Origin, Authorization" });
                          policy.WithMethods(new[] { "POST, GET, PUT, DELETE, OPTIONS" });
                          policy.AllowAnyMethod();  
                          policy.AllowAnyHeader();
                       //   policy.AllowAnyOrigin();
                          policy.SetIsOriginAllowedToAllowWildcardSubdomains();
                          policy.SetPreflightMaxAge(TimeSpan.FromSeconds(600));
                      });
});


builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

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
