import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOfertaComponent } from './detalle-oferta.component';

describe('DetalleOfertaComponent', () => {
  let component: DetalleOfertaComponent;
  let fixture: ComponentFixture<DetalleOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
