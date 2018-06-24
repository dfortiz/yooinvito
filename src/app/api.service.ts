import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Http, Response } from '@angular/http';
import { Oferta } from './oferta';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/subscribeOn';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {TimerObservable} from 'rxjs/Observable/TimerObservable';
import { Categoria } from './categoria';
import { Categoriaempresa } from './categoriaempresa';


const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  private tick: number;

  ofertas: Observable<Oferta[]>;
  ofertaSelected: Oferta;
  categoriaempresas: Observable<Categoriaempresa[]>;

  public latitude: number;
  public longitude: number;

  private cat: Categoria[] ;

  public current_position_latitude = -17.783631;
  public current_position_longitude = -63.182191;

  constructor(
    private http: HttpClient
  ) {
    this.ofertas = this.getAllOfertas();
    this.categoriaempresas = this.getAllCategoriaEmpresa();
    console.log('this.categoriaempresas:', this.categoriaempresas);

    // const timer = TimerObservable.create(2000, 1000);
    // timer.subscribe(t => {
    //   this.tick = t;
    // });
    // this.timer.subscribe(t => this.tickerFunc(t));

    this.getLocationNG();

    const intervalLocationID = setInterval(this.getLocationNG.bind(this), 30000);

   }

  tickerFunc(tick) {
    console.log(this);
    this.tick = tick;
  }

   public setOfertasSelected(ofertaS: Oferta) {
    this.ofertaSelected = ofertaS;
   }

   public getOfertaSelected(): Oferta {
    return this.ofertaSelected;
   }

   public getAllOfertasStore(): Observable<Oferta[]> {
    return this.ofertas;
   }

   public getAllCategoriaEmpresaStore(): Observable<Categoriaempresa[]> {
    return this.categoriaempresas;
   }

   public getAllCategoriaEmpresa(): Observable<Categoriaempresa[]> {
    console.log('getAllCategoriaEmpresa init' + API_URL + 'categoriaempresa.php');
    return this.http.get<Categoriaempresa[]>('http://www.yooinvito.com/yoo/rest/categoriaempresa.php');
   }

  // API: GET /todos
  // public getAllOfertas(): Observable<Oferta[]> {
  public getAllOfertas(): Observable<Oferta[]> {
    console.log('getAllOfertas init' + API_URL + 'ofertas.php');
    return this.http.get<Oferta[]>('http://www.yooinvito.com/yoo/rest/ofertas.php');
              // .subscribe(data => {
              //   console.log('servicio OK1111 getAllOfertas 1');
              //   console.log(data);
              //   console.log('servicio OK1111 getAllOfertas 29');
              // });
    // return this.http
    //   .get(API_URL + 'ofertas.php')
    //   .map(response => {
    //     console.log('servicio OK getAllOfertas');
    //     return '';
    //     // const ofertas = response.json();
    //     // return ofertas.map((oferta) => new Oferta(oferta));
    //   })
    //   .catch(this.handleError);
  }

  public getAllCategorias(): Categoria[] {
    console.log('getAllCategorias init' + API_URL + 'ofertas.php');
    return this.cat;
// http://www.yooinvito.com/yoo/rest/categorias.php
    // return this.http.get<Oferta[]>('http://www.yooinvito.com/yoo/rest/categorias.php');
  }

  public getLocationNGCB (position: any) {
    this.current_position_latitude = position.coords.latitude;
    this.current_position_longitude = position.coords.longitude;
    console.log('getLocationNG getCurrentPosition', this.current_position_latitude, this.current_position_longitude);
    return 0;
  }

  public getLocationNG() {
    if (navigator.geolocation) {
      console.log('getLocationNG if');
      navigator.geolocation.getCurrentPosition(this.getLocationNGCB.bind(this));
    } else {
      console.log('getLocationNG else');
      this.current_position_latitude = -17.783631;
      this.current_position_longitude = -63.182191;
    }
    return 0;
}

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}




/*
// https://sergeome.com/blog/2017/11/26/simply-about-new-httpclient-in-angular/
getData() {
  const requestHeaders = new HttpHeaders().set('Content-Type', 'text').append('Authorization', 'CustomToken12345');
  this.http.get('https://example.com/somejson', {
      headers: requestHeaders
  })
    .map((data:HttpEvent<object>) => {
      console.log(data);
  })
}

*/
