import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/services/bus.service';

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
  reserve(){
    
  }

}
