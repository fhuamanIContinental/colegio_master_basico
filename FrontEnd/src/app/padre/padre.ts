import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hijo } from '../hijo/hijo';

type Persona = {
  id: number;
  nombre: string;
  edad: number;
  fechaNacimiento: Date;
  ahorros: number;
  categoria?: string;
};

@Component({
  selector: 'app-padre',
  imports: [FormsModule, Hijo, DatePipe, CurrencyPipe],
  templateUrl: './padre.html',
  styleUrls: ['./padre.scss'],
})
export class Padre implements OnInit {

  protected readonly nombre = signal('');


  personas: Persona[] = [
    { id: 1, nombre: 'Juan', edad: 17, fechaNacimiento: this.ObtenerFechaNacimientoDesdeEdad(17), ahorros: this.ObtenerAhorroAleatorio() },
    { id: 2, nombre: 'María', edad: 20, fechaNacimiento: this.ObtenerFechaNacimientoDesdeEdad(20), ahorros: this.ObtenerAhorroAleatorio() },
    { id: 3, nombre: 'Pedro', edad: 70, fechaNacimiento: this.ObtenerFechaNacimientoDesdeEdad(70), ahorros: this.ObtenerAhorroAleatorio() }
  ]



  ngOnInit(): void {

    this.asignarCategoria();

  }

  asignarCategoria() {
    this.personas.forEach(persona => {
      persona.ahorros = 15000; // Asignar un valor de ahorros aleatorio
      if (persona.edad < 18) {
        persona.categoria = 'menor de edad';
      } else if (persona.edad >= 18 && persona.edad < 65) {
        persona.categoria = 'adulto';
      } else if (persona.edad >= 65) {
        persona.categoria = 'mayor de edad';
      }

    });
  }

  ObtenerFechaNacimientoDesdeEdad(edad: number): Date {
    const fechaActual = new Date();
    return new Date(fechaActual.getFullYear() - edad, 0, 1);
  }

  ObtenerAhorroAleatorio(): number {
    return 18065;
  }


  recibirPersona(event: Persona) {
    console.log("Datos recibidos del hijo:", event);
    if (!event.fechaNacimiento) {
      event.fechaNacimiento = this.ObtenerFechaNacimientoDesdeEdad(event.edad);
    }
    if (event.ahorros === undefined || event.ahorros === null) {
      event.ahorros = this.ObtenerAhorroAleatorio();
    }
    this.personas.push(event);
    this.asignarCategoria();
  }

}