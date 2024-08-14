import { Component } from '@angular/core';
import { SidebarToggleServiceService } from 'src/app/services/sidebar-toggle-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  ngOnInit(): void {
    this.show()
  }

  constructor(private sidebarservice: SidebarToggleServiceService) { }
   isSidebarHidden=!this.sidebarservice.isSidebarOpen;
   show(){
    console.log(this.isSidebarHidden);
   }


}
