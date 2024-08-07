import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css'] // Corrected from styleUrl to styleUrls
})
export class UpdateuserComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: null,
    age: null,
    sex: '',
    role: '',
    username: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service:ServiceService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.service.getUserById(userId).subscribe(data => {
        this.user = data;
      });
    } else {
      console.error('No user ID found in route parameters');
      this.router.navigate(['/users']);
    }
  }

  updateUser(): void {
    this.service.updateUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
      console.log('User updated successfully');
    });
  }
}