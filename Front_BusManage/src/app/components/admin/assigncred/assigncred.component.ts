import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assigncred',
  templateUrl: './assigncred.component.html',
  styleUrls: ['./assigncred.component.css']
})
export class AssigncredComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AssigncredComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.editForm = this.fb.group({
      username: [data.username, Validators.required],
      password: ['', Validators.required]
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    if (this.editForm.valid) {
      const updatedUser: User = { ...this.data, ...this.editForm.value };
      console.log('Updated User Data:', updatedUser); // Log the updated user data

      this.userService.assigncred(updatedUser).subscribe(
        (response) => {
          console.log('Update Response:', response); // Log the response

          // Send email with updated credentials
// Send email with updated credentials
      this.userService.sendEmail(
          updatedUser.email, // Email to send to
          'Your credentials have been updated', // Subject
          `Username: ${updatedUser.username}, Password: ${updatedUser.password}` // Text content
        ).subscribe(response => {
        console.log(response);
}, error => {
  console.error('Error sending email:', error);
});

          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error updating user', error); // Log the error
          alert('Failed to update user credentials. Please try again.');
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
