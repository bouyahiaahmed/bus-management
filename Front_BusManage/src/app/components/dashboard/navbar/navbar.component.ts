import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarToggleServiceService } from 'src/app/services/sidebar-toggle-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  isQualityManager: boolean = false;


  constructor(
    private sidebarToggleService: SidebarToggleServiceService,
    private router: Router
  ) {}


  ngOnInit(): void {
  }


  toggleSidebar() {
    this.sidebarToggleService.toggleSidebar();
  }


  closeSidebar() {
    this.sidebarToggleService.closeSidebar();
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


 
}
