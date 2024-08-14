import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarToggleServiceService } from 'src/app/services/sidebar-toggle-service.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private sidebarToggleService: SidebarToggleServiceService) {}
  isSidebarOpen = false;


  ngOnInit() {
    this.sidebarToggleService.getToggleSubject().subscribe(() => {
      this.sidenav.toggle();
    });
  }
  toggleSidebar() {
    console.log(this.isSidebarOpen);
    this.sidebarToggleService.closeSidebar();
    
  }








 



}
