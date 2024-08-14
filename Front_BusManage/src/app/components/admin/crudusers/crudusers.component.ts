import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; // Import MatSort
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { EdituserComponent } from '../edituser/edituser.component';
import { ViewuserComponent } from '../viewuser/viewuser.component';
import { AssigncredComponent } from '../assigncred/assigncred.component';

@Component({
  selector: 'app-crudusers',
  templateUrl: './crudusers.component.html',
  styleUrls: ['./crudusers.component.css']
})
export class CrudusersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Reference to MatPaginator
  @ViewChild(MatSort) sort!: MatSort; // Reference to MatSort
  
  users: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'sex', 'role', 'age', 'assignedcredentials', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator; // Set the paginator
      this.dataSource.sort = this.sort; // Set the sorter
    });
  }

  openEditDialog(element: User): void {
    console.log('Editing user with ID:', element.id);
    const dialogRef = this.dialog.open(EdituserComponent, {
      width: '600px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the user data with the result
        const index = this.dataSource.data.findIndex(user => user.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the table
          this.dataSource.paginator = this.paginator; // Reassign paginator
          this.dataSource.sort = this.sort; // Reassign sorter
        }
      }
    });
  }
  openAssingDialog(element: User): void {
    console.log('Editing user with ID:', element.id);
    const dialogRef = this.dialog.open(AssigncredComponent, {
      width: '600px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the user data with the result
        const index = this.dataSource.data.findIndex(user => user.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the table
          this.dataSource.paginator = this.paginator; // Reassign paginator
          this.dataSource.sort = this.sort; // Reassign sorter
        }
      }
    });
  }

  viewUserDetails(id: string): void {
    this.userService.getUserById(id).subscribe(
      (user) => {
        // Open the dialog to show user details
        this.openUserDetailsDialog(user);
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  openUserDetailsDialog(user: User): void {
    const dialogRef = this.dialog.open(ViewuserComponent, {
      width: '600px',
      data: { user } // Pass user object to dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close event if needed
    });
  }

  searchUsers(firstname: string): void {
    const filterValue = firstname.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return data.firstName.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          // Remove deleted user from data source
          this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
          console.log(`User with ID ${id} deleted successfully`);

          // Check if paginator is defined before calling firstPage
          if (this.paginator) {
            this.paginator.firstPage();
          }
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }
}
