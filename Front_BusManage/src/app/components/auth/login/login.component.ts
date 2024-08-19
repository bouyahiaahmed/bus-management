// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: AuthService
  ) {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe(
        response => {
          const token = response.token;
          localStorage.setItem("accesstoken", JSON.stringify(token));
          const user = response;
          console.log(response);
          localStorage.setItem('user', JSON.stringify(user));
          if (response.role === 'ADMIN') {
            this.router.navigate(['/dashboard/management/users']);
          }
          if (response.role === 'AGENT') {
            this.router.navigate(['dashboard/agent/reserve']);
          }
          if (response.role === 'DRIVER') {
            this.router.navigate(['/dashboard/driver/plan']);
          }
          if (response.role === 'RH') {
            this.router.navigate(['/rh']);
          }
          
          
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
    }
  }
}
