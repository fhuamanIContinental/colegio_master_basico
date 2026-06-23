import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoClienteService {


  private _http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7147/api/estadocliente';
  constructor() { }

  getAll() {

    return this._http.get(this.apiUrl);

  }
}


