import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RHInterfaceComponent } from './rh-interface.component';

describe('RHInterfaceComponent', () => {
  let component: RHInterfaceComponent;
  let fixture: ComponentFixture<RHInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RHInterfaceComponent]
    });
    fixture = TestBed.createComponent(RHInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
