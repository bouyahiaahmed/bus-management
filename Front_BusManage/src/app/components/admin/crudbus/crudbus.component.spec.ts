import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudbusComponent } from './crudbus.component';

describe('CrudbusComponent', () => {
  let component: CrudbusComponent;
  let fixture: ComponentFixture<CrudbusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudbusComponent]
    });
    fixture = TestBed.createComponent(CrudbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
