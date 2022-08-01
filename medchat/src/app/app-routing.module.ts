import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/register/register.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import {RecordatoriosComponent} from './components/recordatorios/recordatorios.component';
import { ErrorComponent } from './components/error/error.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent} from './components/chat/chat.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'pharmacy', component:PharmacyComponent},
  {path: 'recordatorios', component:RecordatoriosComponent},
  {path: 'about', component: AboutComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'chat', component:ChatComponent},
  {path: 'error', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
