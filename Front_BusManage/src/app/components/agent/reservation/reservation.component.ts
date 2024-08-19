import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/services/bus.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['busNumber', 'maxSeats', 'reservedSeats', 'startingDestination', 'currentDriver', 'state', 'actions'];
  dataSource: MatTableDataSource<Bus> = new MatTableDataSource();

  constructor(private busService: BusService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadBuses(); // Initial load of buses
  }

  loadBuses(): void {
    this.busService.getBuses().subscribe(data => {
      this.dataSource.data = data; // Update the dataSource directly
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  searchBuses(startingDestination: string): void {
    const filterValue = startingDestination.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Bus, filter: string) => { 
        const destination = data.starting_destination ? data.starting_destination.toLowerCase() : '';
        return destination.includes(filter);
    };
    this.dataSource.filter = filterValue;
}
reserve(element: Bus): void {
  const userJson = localStorage.getItem('user');
  if (userJson) {
    const user: User = JSON.parse(userJson);
    console.log('Reserving seat for user:', user);
    
    this.busService.reserveSeat(element.id, user).subscribe(
      (response: string) => {
        if (response === 'already_reserved') {
          // Show a message indicating the user has already reserved a seat
          alert('You have already reserved a seat on this bus.');
        } else if (response === 'no_seats_available') {
          // Handle case where no seats are available
          alert('No available seats on this bus.');
        } else {
          // Handle successful reservation
          console.log('Reservation successful:', response);
          this.loadBuses(); // Reload the buses to update the reserved seats
        }
      },
      error => {
        console.error('Reservation failed:', error);
        if (error.error) {
          console.error('Error details:', error.error);
        }
        // Handle reservation failure (e.g., show an error message)
      }
    );
  } else {
    console.error('No user found in local storage');
    // Handle the case where no user is found
  }
}
}
