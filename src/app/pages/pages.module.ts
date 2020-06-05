import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';

import { InicioComponent } from './inicio/inicio.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [PagesComponent, InicioComponent, NoteDetailComponent, NoteFormComponent, SearchComponent, ProfileComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
