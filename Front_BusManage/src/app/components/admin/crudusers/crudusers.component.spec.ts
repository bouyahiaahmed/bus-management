import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudusersComponent } from './crudusers.component';

describe('CrudusersComponent', () => {
  let component: CrudusersComponent;
  let fixture: ComponentFixture<CrudusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudusersComponent]
    });
    fixture = TestBed.createComponent(CrudusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
