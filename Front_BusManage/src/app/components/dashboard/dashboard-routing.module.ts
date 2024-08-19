import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';// Import DashboardComponent


const routes: Routes = [
  {
    path: "",
    component: DashboardComponent, // Set DashboardComponent as the component for the empty path
    children: [
      {
        path: "", // Empty path for the dashboard module
        redirectTo: "", // Redirect to the 'home' route
        pathMatch: "full" // Ensure full match for the empty path
      },
      {
        path: "management",
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
      },
      {
        path: "agent",
        loadChildren: () => import('../agent/agent.module').then(m => m.AgentModule),
      },
      {
        path: "driver",
        loadChildren: () => import('../driver/driver.module').then(m => m.DriverModule),
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }