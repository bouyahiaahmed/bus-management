// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

/*   submit(): void {
    if (this.form.valid) {
      this.loginService.login(this.form.value.username, this.form.value.password).subscribe(
        response => {
          const token = response.access_token;
          localStorage.setItem("accesstoken", JSON.stringify(token));
          localStorage.setItem("isLoggedIn", "true");
          const decoded: any = jwtDecode(token);
          localStorage.setItem("userRoles", JSON.stringify(decoded.roles));
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
    }
  } */
}
