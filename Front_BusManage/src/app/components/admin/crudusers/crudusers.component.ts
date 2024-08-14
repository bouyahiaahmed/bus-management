import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { EdituserComponent } from '../edituser/edituser.component';
import { ViewuserComponent } from '../viewuser/viewuser.component';


@Component({
  selector: 'app-crudusers',
  templateUrl: './crudusers.component.html',
  styleUrls: ['./crudusers.component.css']
})
export class CrudusersComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator; // Référence au paginateur MatPaginator

  openEditDialog(element: User): void {
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
        }
      }
    });
  }
  users: User[] = [];
  totalElements: number = 0;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'sex', 'role', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  constructor(private userService: UserService , private dialog:MatDialog // Inject DepartmentService
  ){

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      console.log(this.users);
    });
  }

  viewUserDetails(id: string): void {
    this.userService.getUserById(id).subscribe(
      (user) => {
        // Ouvrez le dialogue pour afficher les détails de l'utilisateur
        this.openUserDetailsDialog(user);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur', error);
      }
    );
  }

  openUserDetailsDialog(user: User): void {
    const dialogRef = this.dialog.open(ViewuserComponent, {
      width: '600px',
      data: { user } // Passer l'objet utilisateur au dialogue
    });

    dialogRef.afterClosed().subscribe(result => {
      // Gérer l'événement de fermeture du dialogue si nécessaire
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
          // Filter out the deleted user from the data source
          this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
  
          // Log the ID and success message
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
