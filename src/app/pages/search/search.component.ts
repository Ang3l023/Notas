import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NotesService } from '../../services/notes.service';
import { FirebaseService } from '../../services/firebase.service';

import { Note } from '../../interfaces/note';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  notes: Note[] = [];

  search: FormGroup;

  val = '';

  constructor(
    private servNotes: NotesService,
    private servAuth: FirebaseService,
    private routeActv: ActivatedRoute
  ) {
    routeActv.params.subscribe(
      (param: any) => {
        this.val = param.id;
        if ( servNotes.notes.length === 0 ) {
          this.getAllNotes(servAuth.usuario.uid);
        } else {
          this.buscarNotes(this.val);
        }
      }
    );
  }

  ngOnInit(): void {
    this.search = new FormGroup({
      search: new FormControl(this.val, Validators.required)
    });
  }

  buscarNotes(valor: string) {
    this.notes = this.servNotes.searchNotes(valor);
  }

  getAllNotes(usuario: string) {
    this.servNotes.readNoteUsuario(usuario)
      .subscribe( res => {
        if (this.val !== '') {
          this.buscarNotes(this.val);
        }
      } );
  }

}
