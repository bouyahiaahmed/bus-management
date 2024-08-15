import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudusersComponent } from './crudusers/crudusers.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CrudbusComponent } from './crudbus/crudbus.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { AssigncredComponent } from './assigncred/assigncred.component';
import { EditbusComponent } from './editbus/editbus.component';
import { AddbusComponent } from './addbus/addbus.component';
import { AssignbusComponent } from './assignbus/assignbus.component';



@NgModule({
  declarations: [
    CrudusersComponent,
    CrudbusComponent,
    EdituserComponent,
    ViewuserComponent,
    AssigncredComponent,
    EditbusComponent,
    AddbusComponent,
    AssignbusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    AdminRoutingModule,
    
  ]
})

export class AdminModule { }
