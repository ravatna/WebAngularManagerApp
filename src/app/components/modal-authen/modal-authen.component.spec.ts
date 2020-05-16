import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAuthenComponent } from './modal-authen.component';

describe('ModalAuthenComponent', () => {
  let component: ModalAuthenComponent;
  let fixture: ComponentFixture<ModalAuthenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAuthenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAuthenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
