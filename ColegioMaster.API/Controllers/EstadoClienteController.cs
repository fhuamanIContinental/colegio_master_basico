using ColegioMaster.DtoModels.EstadoCliente;
using ColegioMaster.Negocio.EstadoCliente;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ColegioMaster.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoClienteController : ControllerBase
    {


        //AQUI CREAMOS LOS METODOS PARA EL CRUD DE ESTADO CLIENTE
        //EN BASE A LOS VERBOS DE HTTP, USAREMOS LOS ATRIBUTOS CORRESPONDIENTES PARA CADA METODO
        //GET : OBTENER TODOS LOS ESTADOS DE CLIENTE
        //GET/ID : OBTENER UN ESTADO DE CLIENTE POR ID
        //POST : CREAR UN NUEVO ESTADO DE CLIENTE
        //PUT/ID : ACTUALIZAR UN ESTADO DE CLIENTE POR ID
        //DELETE/ID : ELIMINAR UN ESTADO DE CLIENTE POR ID


        private readonly IEstadoClienteService _estadoClienteService;

        public EstadoClienteController(IEstadoClienteService estadoClienteService)
        {
            _estadoClienteService = estadoClienteService;
        }   



        /// <summary>
        /// Obtiene todos los estados de cliente.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<List<EstadoClienteDto>>> GetAllEstadoCliente()
        {
            List<EstadoClienteDto> estados = await _estadoClienteService.GetAll();
            return Ok(estados);
        }

        /// <summary>
        /// Obtiene un estado de cliente por ID.
        /// </summary>
        /// <param name="id">ID es el identificador (hace referencia al primary key) del estado de cliente</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<EstadoClienteDto>> GetEstadoClienteById(int id)
        {
            EstadoClienteDto estado = await _estadoClienteService.GetById(id);
            if (estado == null)
            {
                return NotFound();
            }
            return Ok(estado);
        }

        /// <summary>
        /// Crea un nuevo estado de cliente.
        /// </summary>
        /// <param name="estadoCliente">Objeto que contiene la información del nuevo estado de cliente</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<EstadoClienteDto>> CreateEstadoCliente([FromBody] EstadoClienteCrearDto estadoCliente)
        {
            EstadoClienteDto createdEstado = await _estadoClienteService.Create(estadoCliente);
            return Ok(createdEstado);
        }

        /// <summary>
        /// Actualiza un estado de cliente por ID.
        /// </summary>
        /// <param name="id">ID es el identificador (hace referencia al primary key) del estado de cliente</param>
        /// <param name="estadoCliente">Objeto que contiene la información actualizada del estado de cliente</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<EstadoClienteDto>> UpdateEstadoCliente(int id, [FromBody] EstadoClienteActualizarDto estadoCliente)
        {
            EstadoClienteDto updatedEstado = await _estadoClienteService.Update(id, estadoCliente);
            if (updatedEstado == null)
            {
                return NotFound();
            }
            return Ok(updatedEstado);
        }

        /// <summary>
        /// Elimina un estado de cliente por ID.
        /// </summary>
        /// <param name="id">ID es el identificador (hace referencia al primary key) del estado de cliente</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteEstadoCliente(int id)
        {
            bool result = await _estadoClienteService.Delete(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
