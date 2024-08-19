import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentRoutingModule } from './agent-routing.module';
import { ReservationComponent } from './reservation/reservation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReservationComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class AgentModule { }
