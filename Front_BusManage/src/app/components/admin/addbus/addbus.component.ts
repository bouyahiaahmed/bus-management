import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Bus } from 'src/app/models/bus.model';
import { Role, User } from 'src/app/models/user.model';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-addbus',
  templateUrl: './addbus.component.html',
  styleUrls: ['./addbus.component.css']
})
export class AddbusComponent {
  busForm!: FormGroup;
  busAdded = false;

  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private dialogRef: MatDialogRef<AddbusComponent>
    
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  emptyUser: User = {
    id: '0',
    firstName: 'Unassigned',
    lastName: 'Driver',
    email: 'test@gmail.com',
    phoneNumber: 0,
    age: 0,
    sex: 'N/A',
    role: Role.DRIVER , 
    username: 'unassigned_user',
    password: 'pass',
    assignedcredentials: false
  };

  initializeForm(): void {
    this.busForm = this.fb.group({
      busNumber: ['', Validators.required],
      maxSeats: [0, [Validators.required, Validators.min(1)]],
      state: [false, Validators.required],
      startingdestination: [''],
      currentDriver: [this.emptyUser],
      reservedseat: [0]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveBus(): void {
    if (this.busForm.valid) {
      const busData: Bus = this.busForm.value;
      this.busService.addBus(busData).subscribe(
        response => {
          console.log('Bus registration successful', response);
          this.busAdded = true;
          this.dialogRef.close(this.busAdded); // Close dialog and pass the flag
        },
        error => {
          console.error('Bus registration failed', error);
        }
      );
    }
  }
  resetForm(): void {
    this.busForm.reset();
  }
}
