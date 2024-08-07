import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']  // Use styleUrls instead of styleUrl
})
export class AdminInterfaceComponent implements OnInit {
  users: any[] = [];

  constructor(private ServiceService: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.ServiceService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  editUser(userId: string): void {
    console.log('it works',userId);
    this.router.navigate(['/update-user', userId]);
    
  }
}
