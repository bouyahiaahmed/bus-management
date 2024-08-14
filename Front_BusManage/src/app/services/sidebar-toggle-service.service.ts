import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidebarToggleServiceService {
  private toggleSubject = new Subject<void>();
  private sidebarStateSubject = new Subject<boolean>();
  public isSidebarOpen: boolean = false;


  toggleSidebar() {
    this.toggleSubject.next();
    this.isSidebarOpen=!this.isSidebarOpen;
  }


  getToggleSubject() {
    return this.toggleSubject.asObservable();
  }


  emitSidebarState(isSidebarOpen: boolean) {
    this.sidebarStateSubject.next(isSidebarOpen);
  }


  getSidebarState() {
    return this.sidebarStateSubject.asObservable();
  }
  closeSidebar() {
    if (this.isSidebarOpen) {
      this.isSidebarOpen = false;
      this.toggleSubject.next();
      this.sidebarStateSubject.next(this.isSidebarOpen);
    }
    // else - do nothing if sidebar is already closed
  }

}
