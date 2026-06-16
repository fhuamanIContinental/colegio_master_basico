import { Component, signal } from '@angular/core';
import { Padre } from './padre/padre';
import { Hijo } from './hijo/hijo';

@Component({
  selector: 'app-root',
  imports: [Padre, Hijo],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'] 
})
export class App {
  protected readonly title = signal('manejar');
}
