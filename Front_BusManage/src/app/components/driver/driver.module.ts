import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverplanComponent } from './driverplan/driverplan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    DriverplanComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule
  ]
})
export class DriverModule { }
