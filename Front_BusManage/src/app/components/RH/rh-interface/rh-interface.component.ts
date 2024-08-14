import { Component, OnInit } from '@angular/core';
import { Role, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-rh-interface',
  templateUrl: './rh-interface.component.html',
  styleUrls: ['./rh-interface.component.css']
})
export class RHInterfaceComponent implements OnInit {
  user = new User();
  roles = Object.values(Role);
  userForm!: FormGroup; 
  successMessage = ''; // New variable to store the success message
  constructor(private userService:UserService, private formBuilder: FormBuilder) {
   }
   
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9+]+$/)]],
      age: ['', [Validators.required, Validators.min(0)]],
      sex: ['', Validators.required],
      username: ['user'],
      password: ['pass'],
      assignedcredentials: [false],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(
        (response) => {
          this.successMessage = 'User added successfully!';
          console.log('User saved successfully', response);
          
        },
        error => {
          console.error('Error saving user:', error);
        }
      );
    }
  }

}
