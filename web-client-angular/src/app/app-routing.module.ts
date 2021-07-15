import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LandingpageComponent } from './components/landingpage/landingpage.component';
import {AdminComponent} from './components/admin/admin.component';
import {CreateuserComponent} from './components/createuser/createuser.component';
import {UpdateuserComponent} from './components/updateuser/updateuser.component';
import {MattableComponent} from './components/mattable/mattable.component';
const routes: Routes = [
  {path : "", component: LandingpageComponent },
  {path : "admin", component: AdminComponent },
  {path : "create", component: CreateuserComponent },
  {path: "update", component : UpdateuserComponent},
  {path: "admintable", component : MattableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
