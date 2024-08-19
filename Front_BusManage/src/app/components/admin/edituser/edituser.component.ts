import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {
  editForm: FormGroup;
  roles = Object.values(Role);
  constructor(
    public dialogRef: MatDialogRef<EdituserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.editForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phoneNumber: [data.phoneNumber, [Validators.required, Validators.pattern(/^[0-9+]+$/)]],
      age: [data.age, [Validators.required, Validators.min(0)]],
      sex: [data.sex, Validators.required],
      role: [data.role, Validators.required]
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
  save() {
    if (this.editForm.valid) {
      const updatedUser: User = { ...this.data, ...this.editForm.value };
      console.log('Updated User Data:', updatedUser); // Log the updated user data

      this.userService.updateUser(updatedUser).subscribe(
        (response) => {
          console.log('Update Response:', response); // Log the response
          this.dialogRef.close(response); // Close dialog and return updated user data
        },
        (error) => {
          console.error('Error updating user', error); // Log the error
        }
      );
    } else {
      console.log('Form is invalid'); // Log if the form is invalid
      console.log('Form Errors:', this.editForm.errors); // Log form errors
      Object.keys(this.editForm.controls).forEach(key => {
        const controlErrors = this.editForm.get(key)?.errors;
        if (controlErrors != null) {
          console.log('Key control: ' + key + ', errors: ' + JSON.stringify(controlErrors));
        }
      });
    }
  }
}