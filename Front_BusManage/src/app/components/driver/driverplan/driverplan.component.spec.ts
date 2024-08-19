import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverplanComponent } from './driverplan.component';

describe('DriverplanComponent', () => {
  let component: DriverplanComponent;
  let fixture: ComponentFixture<DriverplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverplanComponent]
    });
    fixture = TestBed.createComponent(DriverplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
