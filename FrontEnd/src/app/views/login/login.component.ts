import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthRequest } from './models/auth-response.mode';
import { AuthResponse } from './models/auth-request.model';
import { GeneralResponse } from '../../models/general-response.model';

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
    const controlUsuario = this.formularioIngreso.get('username');
    const controlContrasena = this.formularioIngreso.get('password');

    if (controlUsuario?.hasError('required') && controlUsuario?.touched) {
      errores.push('El campo usuario es requerido.');
    }

    if (controlContrasena?.hasError('required') && controlContrasena?.touched) {
      errores.push('El campo password es requerido.');
    }

    return errores;
  }

  protected ProcesarIngreso(): void {
    if (!this.formularioIngreso.valid) {
      this.formularioIngreso.markAllAsTouched();
      return;
    }

    const lgRequest: AuthRequest = this.formularioIngreso.getRawValue() as AuthRequest;

    this._authService.ingresar(lgRequest).subscribe({
      next: (response: GeneralResponse<AuthResponse>) => {
        if (response && response.content && 'token' in response.content) {
          this._authService.GuardarToken(response.content.token as unknown as string);
        }
        void this._router.navigate(['/dashboard']);
      },
      error: (error: unknown) => {
        console.error('Error al procesar el ingreso:', error);
      }
    });
  }
}
