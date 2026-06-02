using ColegioMaster.API.Extensions;
using ColegioMaster.DtoModels.Compartido;
using ColegioMaster.Negocio.EstadoCliente;
using ColegioMaster.Repositorio.Implement;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


builder.Services.AddScoped<IEstadoClienteService, EstadoClienteService>();
builder.Services.AddScoped<IEstadoClienteRepositorio, EstadoClienteRepositorio>();

var app = builder.Build();


/*REGISTRAR EL MIDLEWARE*/
// --- REGISTRAR EL MIDDLEWARE AQUÍ ---
app.UseMiddleware<CustomMidleware>();
// ------------------------------------


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
