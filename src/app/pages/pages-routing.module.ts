import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { NoteFormComponent } from './note-form/note-form.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                component: InicioComponent
            },
            {
                path: 'search',
                component: SearchComponent
            },
            {
                path: 'search/:id',
                component: SearchComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'new',
                component: NoteFormComponent
            },
            {
                path: 'edit/:id',
                component: NoteFormComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
