import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Import Module
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//Import Service
import { SystemsService } from './services/systems.service';
import { ShopService } from './services/shop.service';
import { SettingService } from './services/setting.service';
import { RestfullService } from './services/restfull.service';
import { OrderService } from './services/order.service';
import { AccountService } from './services/account.service';
//Import Component
import { AppheaderComponent } from './components/appsection/appheader/appheader.component';
import { AppfooterComponent } from './components/appsection/appfooter/appfooter.component';
import { AppmenuComponent } from './components/appsection/appmenu/appmenu.component';
import { AppsettingComponent } from './components/appsection/appsetting/appsetting.component';
//Config
import JSON_CONFIG from '../assets/config/config.inc.json';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeModule } from './pages/home/home.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { AccountComponent } from './pages/account/account.component';
import { ModalAuthenComponent } from './components/modal-authen/modal-authen.component';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    AppsettingComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    AccountComponent,
    ModalAuthenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HomeModule,
    DashboardModule,
    AppRoutingModule, /**Final RoutingModule */
  ],
  providers: [
    SystemsService,
    ShopService,
    SettingService,
    RestfullService,
    OrderService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
