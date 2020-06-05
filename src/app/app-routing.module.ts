import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './errors/error404/error404.component';

import { LoggedverfGuard } from './guards/loggedverf.guard';
import { RedirectloginGuard } from './guards/redirectlogin.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canLoad: [LoggedverfGuard]
  },
  {
    path: '',
    loadChildren: () => import('./formulario/formas.module').then(m => m.FormasModule),
    canLoad: [ RedirectloginGuard ]
  },
  {
    path: '**',
    component: Error404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
