import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAppointmentComponent } from './active-appointment.component';

describe('ActiveAppointmentComponent', () => {
  let component: ActiveAppointmentComponent;
  let fixture: ComponentFixture<ActiveAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
