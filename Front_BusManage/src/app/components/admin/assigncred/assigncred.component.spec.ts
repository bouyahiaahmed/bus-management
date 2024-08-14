import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigncredComponent } from './assigncred.component';

describe('AssigncredComponent', () => {
  let component: AssigncredComponent;
  let fixture: ComponentFixture<AssigncredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssigncredComponent]
    });
    fixture = TestBed.createComponent(AssigncredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
