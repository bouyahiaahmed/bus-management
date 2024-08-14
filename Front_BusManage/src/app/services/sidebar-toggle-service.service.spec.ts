import { TestBed } from '@angular/core/testing';

import { SidebarToggleServiceService } from './sidebar-toggle-service.service';

describe('SidebarToggleServiceService', () => {
  let service: SidebarToggleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarToggleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
