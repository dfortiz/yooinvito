import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  public isChecked = true;
  constructor() { }

  ngOnInit() {
    if ( !localStorage.getItem('reg_checknotificacion' ) ) {
      localStorage.setItem('reg_checknotificacion', '1');
    }
    this.isChecked = localStorage.getItem('reg_checknotificacion' ) === '1';
  }

  checkValue(event: any) {
    this.isChecked = !this.isChecked;
    if ( this.isChecked ) {
      localStorage.setItem('reg_checknotificacion', '1' );
    } else {
      localStorage.setItem('reg_checknotificacion', '0' );
    }
    console.log(event);
  }

}
