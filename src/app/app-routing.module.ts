import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Notfound404Component } from './pages/notfound404/notfound404.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/account/account.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'login.html',
  component: LoginComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: 'account',
  component: AccountComponent
},
{
  path: '404.html',
  component: Notfound404Component
},
{
  path: '**',
  redirectTo: '/404.html'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
