import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Oferta } from '../../oferta';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AgmCoreModule, GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral, MapsAPILoader } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-detalle-oferta',
  templateUrl: './detalle-oferta.component.html',
  styleUrls: ['./detalle-oferta.component.css']
})
export class DetalleOfertaComponent implements OnInit, AfterViewInit  {

  ofertaSelected: Oferta;
  public latitude: number;
  public longitude: number;

  public latitudeMe: number;
  public longitudeMe: number;

  private centerLat: number;
  private centerLng: number;
  public zoom: number;
  public iconUrl: string;
    // latitude: -17.783302473602816;
  // longitude: -63.18213701248169;
 public  mapTypeId: string;

 // public boundsl: LatLngBoundsLiteral;
 public boundsl: any;


 @ViewChild('AgmMap') agmMap: AgmMap;
 // @ViewChild(AgmMap) agmMap;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router
  ) {

    this.latitudeMe = -17.783302473602816;
    this.longitudeMe = -63.18213701248169;

    this.zoom = 13;
    this.mapTypeId = 'roadmap';

    this.ofertaSelected =  this.api.getOfertaSelected();

    console.log('DETALLE OFERTA ', this.ofertaSelected);
    this.latitude = parseFloat(this.ofertaSelected.Latitud) ;
    this.longitude = parseFloat(this.ofertaSelected.Longitud) ;
    this.api.getLocationNG();
    this.latitudeMe = this.api.current_position_latitude;
    this.longitudeMe =  this.api.current_position_longitude;
    console.log('DETALLE this.api.current_position ', this.api.current_position_latitude, this.api.current_position_longitude);

    // const offset = 0.25;

    // console.log(this.agmMap);
    // this.agmMap.mapReady.subscribe(map => {
    //   const bounds = new google.maps.LatLngBounds();
    //   bounds.extend(new google.maps.LatLng(this.latitude, this.longitude));
    //   bounds.extend(new google.maps.LatLng(this.latitudeMe, this.longitudeMe));
    //   map.fitBounds(bounds);
    // });

    // this.boundsl = new google.maps.LatLngBounds();
    // this.boundsl.extend(new google.maps.LatLng(this.latitude, this.longitude));
    // this.boundsl.extend(new google.maps.LatLng(this.latitudeMe, this.longitudeMe));



    // this.latitude = -17.783302473602816;
    // this.longitude = -63.18213701248169;

    /*
    var lat = parseFloat(document.getElementById('lat').value);
    var lng = parseFloat(document.getElementById('lng').value);
    */
  }

  ngOnInit() {
    // this.latitude = -17.783302473602816;
    // this.longitude = -63.18213701248169;
  }

  ngAfterViewInit() {
    console.log('damir ', this.agmMap);
    // this.agmMap.mapReady.subscribe(map => {
    //   const bounds = new google.maps.LatLngBounds();
    //   bounds.extend(new google.maps.LatLng(this.latitude, this.longitude));
    //   bounds.extend(new google.maps.LatLng(this.latitudeMe, this.longitudeMe));
    //   map.fitBounds(bounds);
    // });
  }

  goBack () {
    this.router.navigate(['/listaofertas']);
  }

  onChoseLocation(event) {
    console.log('evento chose');
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  onmapReady(event) {
    console.log('evento onmapReady 1');
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(new google.maps.LatLng(this.latitude, this.longitude));
    bounds.extend(new google.maps.LatLng(this.latitudeMe, this.longitudeMe));
    // map.fitBounds(bounds);
    this.boundsl = bounds;
    console.log('evento onmapReady 2');

  }

  // markerIconUrl() {
  //   return require('../../../images/image.png');
  //   //  [iconUrl]=" markerIconUrl()"
  // }

}
