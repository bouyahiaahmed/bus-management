import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-editbus',
  templateUrl: './editbus.component.html',
  styleUrls: ['./editbus.component.css']
})
export class EditbusComponent {
  busForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private dialogRef: MatDialogRef<EditbusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bus,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.busForm = this.fb.group({
      busNumber: [this.data.busNumber , Validators.required],
      maxSeats: [this.data.maxSeats , [Validators.required, Validators.min(1)]],
      state: [this.data.state, Validators.required],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  editBus(): void {
    if (this.busForm.valid) {
      // Combine the current bus data (which includes the id) with the updated form values
      const busData: Bus = { ...this.data, ...this.busForm.value };
      this.busService.updateBus(busData).subscribe(
        response => {
          console.log('Bus update successful', response);
          this.dialogRef.close(busData); // Pass the updated bus data back to the parent component
        },
        error => {
          console.error('Bus update failed', error);
        }
      );
    }
  }
}
