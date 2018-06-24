export class Oferta {
    // id: number;
    // title = '';
    // complete = false;

    Latitud = '0';
    Longitud = '0';
    idOferta = '';
    idEmpresa = '';
    NombreEmpresa = '';
    NombreOferta = '';
    Descripcion = '';
    FechaHoraInicio = '';
    FechaHoraFin = '';
    ImgOferta = '';
    distance = 0.0;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
