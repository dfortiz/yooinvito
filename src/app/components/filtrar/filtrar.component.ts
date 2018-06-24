import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Categoria } from '../../categoria';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.css']
})
export class FiltrarComponent implements OnInit {

  categorias: Categoria[];

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {

    // this.categorias = this.api.getAllCategorias();
    this.categorias = [];
    this.api.getAllCategoriaEmpresaStore().subscribe(data => {
      console.log('servicio getAllCategoriaEmpresa  inicio');

      for (let i = 0; i < data.length; i++) {
          if ( this.categorias.find(x => x.Nombre === data[i].NombreCategoria) === undefined ) {
            this.categorias.push( new Categoria({idCategoria: data[i].idCategoria, Nombre: data[i].NombreCategoria}) );
          }
      }

      // data.sort((a, b) => a.distance - b.distance);
      // this.ofertas = data;
      console.log('servicio getAllCategoriaEmpresa fin');
    });

  }

  goHome() {
    console.log('goHome:');
    // this.api.setOfertasSelected(oferta);
    this.router.navigate(['/listaofertas']);
  }

  goListFiltered(categoria: Categoria) {
    console.log('Categoria:');
    console.log(categoria);
    // this.api.setOfertasSelected(oferta);
    this.router.navigate(['/listaofertas/' + categoria.idCategoria]);
  }

}
