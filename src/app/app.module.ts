import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListaPreguntasComponent } from './components/lista-preguntas/lista-preguntas.component';
import { ListaOfertasComponent } from './components/lista-ofertas/lista-ofertas.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DetalleOfertaComponent } from './components/detalle-oferta/detalle-oferta.component';
import { AgmCoreModule } from '@agm/core';
import { FiltrarComponent } from './components/filtrar/filtrar.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';

const routes: Routes = [
  { path: '', redirectTo: '/listaofertas', pathMatch: 'full' },
  { path: 'listaofertas/:idCategoria', component: ListaOfertasComponent },
  { path: 'listaofertas', component: ListaOfertasComponent},
  { path: 'detalleoferta', component: DetalleOfertaComponent },
  { path: 'filtrar', component: FiltrarComponent },
  { path: 'configuracion', component: ConfiguracionComponent },

  // path: 'users/:username',
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListaPreguntasComponent,
    ListaOfertasComponent,
    DetalleOfertaComponent,
    FiltrarComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD12esgHTLY-eNCaT9DjJMoMFoIfgbbB7A'
    }),
    RouterModule.forRoot(routes, { useHash: true })  // .../#/crisis-center/
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
