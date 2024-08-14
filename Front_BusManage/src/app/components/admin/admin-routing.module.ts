import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudusersComponent } from './crudusers/crudusers.component';
import { CrudbusComponent } from './crudbus/crudbus.component';

const routes: Routes = [
  { path: 'users', component: CrudusersComponent },
  { path: 'bus', component: CrudbusComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }