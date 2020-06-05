import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Note } from '../../interfaces/note';

import { NotesService } from '../../services/notes.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {

  noteForm: FormGroup;

  update = false;
  text = 'Crear';

  note: Note = {
    created_at: new Date(),
    id: '',
    nota: '',
    titulo: '',
    updated: null,
    usuario: this.servAuth.usuario.uid
  };

  constructor(
    private servNote: NotesService,
    private servAuth: FirebaseService,
    private router: Router,
    private routerActv: ActivatedRoute
  ) {
    routerActv.params.subscribe(
      (param: any) => {
        if (param.id) {
          this.update = true;
          this.text = 'Actualizar';
          this.getNote(param.id);
        }
      }
    );
  }

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      titulo: new FormControl(null, [ Validators.required ]),
      nota: new FormControl(null, [ Validators.required ])
    });
  }

  async submitNote() {
    if (this.noteForm.invalid) {
      return;
    }
    let resp: boolean;
    for (const key of Object.keys(this.note)) {
      if (typeof this.note[key] === 'string' && (key === 'titulo' || key === 'nota' ) ) {
        this.note[key] = this.note[key].toUpperCase();
      }
    }
    if (this.update) {
      resp = await this.servNote.updateNote(this.note.id, this.note);
    } else {
      resp = await this.servNote.createNote(this.note);
    }
    if (resp) {
      this.router.navigate(['/home']);
    }
  }

  getNote(id: string) {
    this.servNote.readNote(id)
      .subscribe(
        doc => this.note = this.servNote.asignarNote(doc)
      );
  }

}
