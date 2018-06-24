import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Oferta } from '../../oferta';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lista-ofertas',
  templateUrl: './lista-ofertas.component.html',
  styleUrls: ['./lista-ofertas.component.css']
})
export class ListaOfertasComponent implements OnInit {

  ofertas: Oferta[];
  idCategoria: string;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
   ) {

    this.route.params.subscribe( params => {
      if (params.idCategoria !== undefined) {
        this.idCategoria = params.idCategoria;
      } else {
        this.idCategoria = '0000000000';
      }
      console.log('Parametro id:', this.idCategoria);
    } );
     /*
    this.ofertas = [
      {
        texto: 'oferta 001',
        enlace: 'kdkdk11'
      },
    ];
    */
   }

  Deg2Rad(deg) {
    return deg * Math.PI / 180;
  }

  PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
     // https://stackoverflow.com/questions/21279559/geolocation-closest-locationlat-long-from-my-position 
    lat1 = this.Deg2Rad(lat1);
    lat2 = this.Deg2Rad(lat2);
    lon1 = this.Deg2Rad(lon1);
    lon2 = this.Deg2Rad(lon2);
    const R = 6371; // km
    const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    const y = (lat2 - lat1);
    const d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  ngOnInit() {

    const empresaFilters = [];
    if ( this.idCategoria !== '0000000000' ) {
      this.api.getAllCategoriaEmpresaStore ().subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].idCategoria === this.idCategoria) {
            empresaFilters.push( data[i].idEmpresa );
          }
        }
      });
    }


    this.api.getAllOfertasStore().subscribe(data => {
      console.log('servicio getAllOfertasStore inicio', this.idCategoria);

      for (let i = 0; i < data.length; i++) {
          if ( empresaFilters.indexOf(data[i].idEmpresa) !== -1 || this.idCategoria === '0000000000' ) {

            data[i].distance = this.PythagorasEquirectangular(
                this.api.current_position_latitude,
                this.api.current_position_longitude,
                data[i].Latitud, data[i].Longitud);
            // data[i].distance = this.PythagorasEquirectangular(-17.783631, -63.182191, data[i].Latitud, data[i].Longitud);
            data[i].distance = Math.round(data[i].distance * 100) / 100;
          } else {
            data[i].distance = -1;
            data.splice(i, 1);
            i--;
          }

      }

      data.sort((a, b) => a.distance - b.distance);

      this.ofertas = data;
      console.log('servicio getAllOfertasStore fin');
    });
  }

  goDetail(oferta: Oferta) {

    // alert('go to');
    // this.router.navigate(['']);
    console.log('oferta:');
    console.log(oferta);
    this.api.setOfertasSelected(oferta);
    this.router.navigate(['/detalleoferta']);
  }

}
