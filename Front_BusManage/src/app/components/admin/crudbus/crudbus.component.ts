import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/services/bus.service';
import { EditbusComponent } from '../editbus/editbus.component';
import { AddbusComponent } from '../addbus/addbus.component';
import { AssignbusComponent } from '../assignbus/assignbus.component';

@Component({
  selector: 'app-crudbus',
  templateUrl: './crudbus.component.html',
  styleUrls: ['./crudbus.component.css']
})
export class CrudbusComponent implements OnInit {
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

  openEditBusDialog(element: Bus): void {
    console.log('Editing bus with ID:', element.id);
    const dialogRef = this.dialog.open(EditbusComponent, {
      width: '600px',
      data: { ...element }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(bus => bus.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data]; // Update the data source
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    });
  }
  openAssignBusDialog(element: Bus): void {
    const dialogRef = this.dialog.open(AssignbusComponent, {
      width: '600px',
      data: { ...element }
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBuses(); // Refresh the list of buses
        const index = this.dataSource.data.findIndex(bus => bus.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data]; // Trigger change detection
          if (this.paginator) {
            this.paginator.firstPage();
          }
        }
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

  deleteBus(id: string): void {
    if (confirm('Are you sure you want to delete this bus?')) {
      this.busService.deleteBus(id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(bus => bus.id !== id);
          if (this.paginator) {
            this.paginator.firstPage();
          }
        },
        (error) => {
          console.error('Error deleting bus', error);
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddbusComponent, {
      width: '600px',
      data: { /* you can pass data here if needed */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) { // Check if the result is true
        this.loadBuses(); // Refresh the list of buses
      }
    });
  }
}
