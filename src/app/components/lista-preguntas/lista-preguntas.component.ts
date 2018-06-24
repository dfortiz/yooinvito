import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-preguntas',
  templateUrl: './lista-preguntas.component.html',
  styleUrls: ['./lista-preguntas.component.css']
})
export class ListaPreguntasComponent implements OnInit {
  ofertas: Object[];

  constructor() {
    this.ofertas = [
      {
        texto: 'oferta 001',
        enlace: 'kdkdk11'
      },
      {
        texto: 'oferta 002',
        enlace: 'kdkdk22'
      },
      {
        texto: 'oferta 003',
        enlace: 'kdkdk33'
      },
      {
        texto: 'oferta 004',
        enlace: 'kdkdk44'
      },
    ];
   }

  ngOnInit() {
  }

}
