import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bus } from 'src/app/models/bus.model';
import { User } from 'src/app/models/user.model';
import { BusService } from 'src/app/services/bus.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assignbus',
  templateUrl: './assignbus.component.html',
  styleUrls: ['./assignbus.component.css']
})
export class AssignbusComponent {
  busForm!: FormGroup;
  drivers: User[] = []; // Array to hold users with the DRIVER role
  selectedDriverId: string | null = null; // To store selected driver ID
  busmod = false;

  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private userService: UserService, // Service to fetch users
    private dialogRef: MatDialogRef<AssignbusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bus,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadDrivers(); // Load drivers from your backend or service
  }

  initializeForm(): void {
    this.busForm = this.fb.group({
      startingDestination: [this.data.starting_destination, Validators.required],
      departureDate: [this.data.departureDate, Validators.required],
      departureTime: [this.data.departureTime, Validators.required],
      currentDriver: [this.data.currentDriver, Validators.required]
    });
  }

  loadDrivers(): void {
    this.userService.getUsersByRole('DRIVER').subscribe(
      (drivers: User[]) => {
        this.drivers = drivers;
      },
      error => {
        console.error('Failed to load drivers:', error);
      }
    );
  }

  onDriverChange(event: any): void {
    const selectedDriver = event.value;
    this.selectedDriverId = selectedDriver ? selectedDriver.id : null;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  assignBus(): void {
    if (this.busForm.valid && this.selectedDriverId) {
      const { startingDestination, departureDate, departureTime } = this.busForm.value;
      this.busService.assignBus(this.data.id, this.selectedDriverId, startingDestination, departureDate, departureTime).subscribe(
        response => {
          console.log('Bus assigned successfully:', response);
          this.busmod = true;
          this.dialogRef.close(true); // Pass a boolean value to indicate success
        },
        error => {
          console.error('Failed to assign bus:', error);
          this.dialogRef.close(false); // Pass a boolean value to indicate failure
        }
      );
    } else {
      console.log('Form is invalid or no driver selected');
    }
  }
}
