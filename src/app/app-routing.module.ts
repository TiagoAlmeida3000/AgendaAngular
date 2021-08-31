import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AutenticadorComponent } from './autenticador/autenticador.component';
import { ContatoFormComponent } from './contato/contato-form/contato-form.component';
import { ContatoListaComponent } from './contato/contato-lista/contato-lista.component';
import { AuthGuard } from './guards/auth.guard';
import { ContatoResolverGuard } from './guards/contato-resolver.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
        {path: '', redirectTo : 'contatos', pathMatch: 'full'},
        {path: 'contatos', component: ContatoListaComponent},
        {path: 'novo', component: ContatoFormComponent },
        {path: 'editar/:id', component: ContatoFormComponent}, 
      ],
      canActivate:[AuthGuard]
  },
  {
    path:'',
    component: AutenticadorComponent,
    children:[
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
