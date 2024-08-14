import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent {


  userDetails: ({ label: string; value: string; icon: string; } | { label: string; value: number; icon: string; })[] | undefined;
  
  constructor(
    public dialogRef: MatDialogRef<ViewuserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}
  ngOnInit(): void {
    const user = this.data.user;
    this.userDetails = [
      { label: 'First Name', value: user.firstName, icon: 'account_circle' },
      { label: 'Last Name', value: user.lastName, icon: 'account_circle' },
      { label: 'Email', value: user.email, icon: 'email' },
      { label: 'Phone Number', value: user.phoneNumber, icon: 'phone' },
      { label: 'Sex', value: user.sex, icon: 'wc' },
      { label: 'Role', value: user.role, icon: 'verified_user' },
      { label: 'Age', value: user.age, icon: 'calendar_today' } // Assuming you need 'age' as well
    ];
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
