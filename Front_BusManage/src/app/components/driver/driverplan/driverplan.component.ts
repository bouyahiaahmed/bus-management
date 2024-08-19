import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-driverplan',
  templateUrl: './driverplan.component.html',
  styleUrls: ['./driverplan.component.css']
})
export class DriverplanComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['busNumber', 'maxSeats', 'reservedSeats', 'startingDestination', 'departureDate', 'departureTime', 'currentDriver', 'state'];
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
  searchBuses(busNumber: string): void {
    const filterValue = busNumber.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Bus, filter: string) => {
      return data.busNumber.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

}
