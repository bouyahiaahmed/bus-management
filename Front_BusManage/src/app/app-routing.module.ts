import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
  },
 
  // Wildcard route to redirect to login page for any other URL
  //{ path: '**', redirectTo: '/login' },
  {path: 'rh', loadChildren: () => import('./components/RH/rh.module').then(m => m.RHModule)},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


