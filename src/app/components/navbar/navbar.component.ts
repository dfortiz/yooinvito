import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goFilter() {
    console.log('goFilter:1');
    // this.api.setOfertasSelected(oferta);
    this.router.navigate(['/filtrar']);
  }

  goSettings() {
    console.log('goSettings:2');
    // this.api.setOfertasSelected(oferta);
    this.router.navigate(['/configuracion']);
  }
}
