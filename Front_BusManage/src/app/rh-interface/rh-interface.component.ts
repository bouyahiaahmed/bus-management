import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

enum Role {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

@Component({
  selector: 'app-rh-interface',
  templateUrl: './rh-interface.component.html',
  styleUrls: ['./rh-interface.component.css']
})
export class RhInterfaceComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: null,
    age: null,
    sex: '',
    role: Role.CLIENT
  };

  message: string = '';

  roles = Object.values(Role); // Array of roles for the select options

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Set default values for username and password
    const userWithoutCredentials = {
      ...this.user,
      username: 'user',
      password: 'pass'
    };

    this.http.post<any>('http://localhost:8080/user/add', userWithoutCredentials)
      .subscribe(
        response => {
          console.log(response); // Log the response for debugging
          this.message = 'User added successfully!';
          this.resetForm();
        },
        error => {
          console.error('Error adding user:', error);
          this.message = 'Failed to add user. Please try again.';
        }
      );
  }

  resetForm() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: null,
      age: null,
      sex: '',
      role: Role.CLIENT
    };
  }
}
