import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RHInterfaceComponent } from './components/RH/rh-interface/rh-interface.component';

const routes:Routes = [
  { path: 'hr', component: RHInterfaceComponent }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  



 }
