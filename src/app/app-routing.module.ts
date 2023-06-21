import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './clientes/list/list.component';
import { FormComponent } from './clientes/form/form.component';
import { clientResolver } from './resolver/client.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'nuevo',
    component: FormComponent,
  },
  {
    path: 'editar/:id',
    component: FormComponent,
    resolve: { client: clientResolver },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
