import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPreguntasComponent } from './lista-preguntas.component';

describe('ListaPreguntasComponent', () => {
  let component: ListaPreguntasComponent;
  let fixture: ComponentFixture<ListaPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
