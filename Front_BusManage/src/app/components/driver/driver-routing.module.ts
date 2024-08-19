import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverplanComponent } from './driverplan/driverplan.component';

const routes: Routes = [
  { path: 'plan', component: DriverplanComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
