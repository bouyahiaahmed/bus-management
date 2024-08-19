import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarToggleServiceService } from 'src/app/services/sidebar-toggle-service.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userRole: string | null = null;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private sidebarToggleService: SidebarToggleServiceService, private userService: UserService) {}
  isSidebarOpen = false;


  ngOnInit() {
    const userJson = localStorage.getItem('user');
    console.log('Retrieved user JSON:', userJson); // Log the raw data from localStorage
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        console.log('Parsed user:', user); // Log the parsed user object
        this.userRole = user.role;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.error('No user data found in localStorage.');
    }
    this.sidebarToggleService.getToggleSubject().subscribe(() => {
      this.sidenav.toggle();
    });
  }
  toggleSidebar() {
    console.log(this.isSidebarOpen);
    this.sidebarToggleService.closeSidebar();
    
  }








 



}
