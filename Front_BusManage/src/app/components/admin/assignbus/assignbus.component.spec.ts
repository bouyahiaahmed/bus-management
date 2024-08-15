import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignbusComponent } from './assignbus.component';

describe('AssignbusComponent', () => {
  let component: AssignbusComponent;
  let fixture: ComponentFixture<AssignbusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignbusComponent]
    });
    fixture = TestBed.createComponent(AssignbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
