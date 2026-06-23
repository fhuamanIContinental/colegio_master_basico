import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  imports: [RouterOutlet]
})
export class TemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
