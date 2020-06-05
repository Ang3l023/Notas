import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NoteComponent
  ]
})
export class ComponentsModule { }
