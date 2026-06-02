using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ColegioMaster.Repositorio.BDColegioMaster;

public partial class Asistencia
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("id_empleado")]
    public int? IdEmpleado { get; set; }

    [Column("fecha_registro", TypeName = "timestamp")]
    public DateTime? FechaRegistro { get; set; }

    [Column("tipo_registro")]
    [StringLength(30)]
    public string? TipoRegistro { get; set; }
}
