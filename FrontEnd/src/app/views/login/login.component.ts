import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthRequest } from './models/auth-response.mode';
import { AuthResponse } from './models/auth-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  protected readonly formularioIngreso = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  protected SePuedeIngresar(): boolean {
    return this.formularioIngreso.valid ?? false;
  }

  protected ObtenerErrores(): string[] {
    const errores: string[] = [];
    const controlUsuario = this.formularioIngreso.get('usuario');
    const controlContrasena = this.formularioIngreso.get('contrasena');

    if (controlUsuario?.hasError('required') && controlUsuario?.touched) {
      errores.push('El campo usuario es requerido.');
    }

    if (controlContrasena?.hasError('required') && controlContrasena?.touched) {
      errores.push('El campo password es requerido.');
    }

    return errores;
  }

  protected ProcesarIngreso() {
    if (!this.formularioIngreso.valid) {
      this.formularioIngreso.markAllAsTouched();
      return;
    }

    let lgRequest: AuthRequest = this.formularioIngreso.getRawValue() as AuthRequest;

    this._authService.ingresar(lgRequest).subscribe({
      next: (response: AuthResponse) => {
        console.log('Respuesta del servidor:', response);
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, guardar el token en el almacenamiento local
        // localStorage.setItem('token', response.token);
        //this._router.navigate(['/padre']);
      },
      error: (error: any) => {
        console.error('Error al procesar el ingreso:', error);

        //this._router.navigate(['/padre']);
      }
    });
  }
}
