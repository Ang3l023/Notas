import { Component, OnInit } from '@angular/core';
import { Note } from '../../interfaces/note';
import { NotesService } from '../../services/notes.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  notes: Note[] = [];

  constructor(
    private servNotes: NotesService,
    private servAuth: FirebaseService
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.servNotes.readNoteUsuario(this.servAuth.usuario.uid)
        .subscribe(
          notes => this.notes = notes
        );
  }

}
