import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbusComponent } from './addbus.component';

describe('AddbusComponent', () => {
  let component: AddbusComponent;
  let fixture: ComponentFixture<AddbusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddbusComponent]
    });
    fixture = TestBed.createComponent(AddbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
