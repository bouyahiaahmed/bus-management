import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RHInterfaceComponent } from './rh-interface/rh-interface.component';

const routes: Routes = [
  {path: '', 
    component: RHInterfaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RHRoutingModule { }
