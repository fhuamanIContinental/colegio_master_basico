import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-request.model';
import { AuthRequest } from '../models/auth-response.mode';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  _http = inject(HttpClient);
  apiUrl = "https://localhost:7147/api/auth";


  constructor() { }


  ingresar(request: AuthRequest): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(this.apiUrl, request);
  }
}
