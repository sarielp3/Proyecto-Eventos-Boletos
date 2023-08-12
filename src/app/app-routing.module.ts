import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './COMPONENTES/login/login.component';
import { InicioComponent } from './COMPONENTES/inicio/inicio.component';
import { AreaComponent } from './COMPONENTES/descripcion/area.component';
import { AsientosComponent } from './COMPONENTES/asientos/asientos.component';
import { CompraComponent } from './COMPONENTES/compra/compra.component';
import { RegistroUsuarioComponent } from './COMPONENTES/registro-usuario/registro-usuario.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'inicio', component: InicioComponent},
  {path:'descripcion/:id', component: AreaComponent},
  {path:'asientos/:id', component: AsientosComponent},
  {path:'compra/:id', component: CompraComponent},
  {path:'registroUsuario', component: RegistroUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
