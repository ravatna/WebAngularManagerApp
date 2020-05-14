import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Notfound404Component } from './pages/notfound404/notfound404.component';


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
