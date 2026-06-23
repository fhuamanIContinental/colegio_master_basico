import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-request.model';
import { AuthRequest } from '../models/auth-response.mode';
import { Observable } from 'rxjs/internal/Observable';
import { GeneralResponse } from '../../../models/general-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7147/api/auth';
  private readonly tokenKey = 'auth_token';

  constructor() { }

  ingresar(request: AuthRequest): Observable<GeneralResponse<AuthResponse>> {
    return this._http.post<GeneralResponse<AuthResponse>>(this.apiUrl, request);
  }

  EstaAutenticado(): boolean {
    return !!this.ObtenerToken();
  }

  GuardarToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  ObtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  CerrarSesion(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
