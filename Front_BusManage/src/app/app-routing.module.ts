import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { UsersComponent } from './users/users.component';
import { RhInterfaceComponent } from './rh-interface/rh-interface.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },  // Redirect to admin interface by default
  { path: 'admin', component: AdminInterfaceComponent },
  { path: 'users', component: UsersComponent },  // Add this route for 'users' path
  { path: 'update-user/:id', component: UpdateuserComponent } // Use 'update-user/:id' instead of 'edit-user/:id'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
