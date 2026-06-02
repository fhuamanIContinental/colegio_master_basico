using ColegioMaster.DtoModels.EstadoCliente;
using ColegioMaster.Repositorio.BDColegioMaster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ColegioMaster.Repositorio.Implement
{
    public class EstadoClienteRepositorio: IEstadoClienteRepositorio
    {

        //Esta parte es incorrecta por debería hacer uso de la inyección de dependencias, pero por simplicidad se hará de esta manera
        _dbContextColegio _db = new _dbContextColegio();

        public async Task<EstadoClienteDto> Create(EstadoClienteCrearDto request)
        {
            //Creamos nuestra clase que representa la tabla en la base de datos
            //y le asignamos los valores del DTO que recibimos como parámetro
            EstadoCliente nuevoRegistro = new EstadoCliente
            {
                Id = request.Id,
                Codigo = request.Codigo,
                Descripcion = request.Descripcion
            };

            await _db.EstadoCliente.AddAsync(nuevoRegistro);
            await _db.SaveChangesAsync();

            //finalmente creamos un nuevo DTO para retornar con los datos del nuevo registro creado
            return new EstadoClienteDto
            {
                Id = nuevoRegistro.Id,
                Codigo = nuevoRegistro.Codigo,
                Descripcion = nuevoRegistro.Descripcion
            };
        }

        public async Task<bool> Delete(int id)
        {
            var entity = _db.EstadoCliente.FirstOrDefault(e => e.Id == id);
            if (entity == null)
                return false;

            _db.EstadoCliente.Remove(entity);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<List<EstadoClienteDto>> GetAll()
        {
            var list = _db.EstadoCliente
                .Select(e => new EstadoClienteDto
                {
                    Id = e.Id,
                    Codigo = e.Codigo,
                    Descripcion = e.Descripcion
                }).ToList();

            return await Task.FromResult(list);
        }

        public async Task<EstadoClienteDto> GetById(int id)
        {
            var entity = _db.EstadoCliente.FirstOrDefault(e => e.Id == id);
            if (entity == null) return await Task.FromResult<EstadoClienteDto>(null);

            return await Task.FromResult(new EstadoClienteDto
            {
                Id = entity.Id,
                Codigo = entity.Codigo,
                Descripcion = entity.Descripcion
            });
        }

        public async Task<EstadoClienteDto> Update(int id, EstadoClienteActualizarDto request)
        {
            var entity = _db.EstadoCliente.FirstOrDefault(e => e.Id == id);
            if (entity == null) return await Task.FromResult<EstadoClienteDto>(null);

            entity.Codigo = request.Codigo;
            entity.Descripcion = request.Descripcion;
            await _db.SaveChangesAsync();

            return await Task.FromResult(new EstadoClienteDto
            {
                Id = entity.Id,
                Codigo = entity.Codigo,
                Descripcion = entity.Descripcion
            });
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
