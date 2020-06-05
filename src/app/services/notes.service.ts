import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Note } from '../interfaces/note';

import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = [];

  constructor(
    private afs: AngularFirestore,
    private servAlert: AlertsService
  ) { }

  async createNote(note: Note) {
    try {
      this.servAlert.getAlertLoading('info', 'Espere Por Favor');
      delete note.id;
      note.created_at = new Date().toString();
      await this.afs.collection('notes').add(note);
      this.servAlert.closeAlert();
      this.servAlert.getAlert('success', 'Nota creada con exito');
      return true;
    } catch (error) {
      this.servAlert.closeAlert();
      this.servAlert.getAlert('error', 'Algo salio mal');
      return false;
    }
  }

  async updateNote(id: string, note: Note) {
    try {
      this.servAlert.getAlertLoading('info', 'Espere Por Favor');
      delete note.id;
      note.created_at = note.created_at.toString();
      note.updated = new Date().toString();
      await this.afs.collection('notes').doc(id).set(note);
      this.servAlert.closeAlert();
      this.servAlert.getAlert('success', 'Nota actualizada con exito');
      return true;
    } catch (error) {
      this.servAlert.closeAlert();
      this.servAlert.getAlert('error', 'Algo salio mal');
      return false;
    }
  }

  readNotes(): Observable<Note[]> {
    return this.afs.collection<Note[]>('notes').get()
            .pipe(
              map(
                res => {
                  let note: Note = {
                    id: '',
                    created_at: null,
                    nota: '',
                    titulo: '',
                    updated: null,
                    usuario: ''
                  };
                  this.notes = [];
                  res.docs.forEach( (doc: any) => {
                    note.id = doc.id;
                    note = { ...doc.data() as Note };
                    this.notes = this.notes.concat(note);
                  } );
                  return this.notes;
                }
              )
            );
  }

  readNoteUsuario(usuario: string) {
    return this.afs.collection('notes', ref => ref.where( 'usuario', '==' , usuario )).get()
              .pipe(
                map(
                  res => {
                    this.notes = [];
                    res.docs.forEach((doc: any) => {
                      const note: Note = this.asignarNote(doc);
                      this.notes = this.notes.concat(note);
                    });
                    return this.notes;
                  }
                )
              );
  }

  readNote(id: string) {
    return this.afs.collection('notes').doc(id).get()
      .pipe(
        map(
          res => {
            return res;
          }
        )
      );
  }

  searchNotes(buscar: string) {
    return this.notes.filter( nto => nto.titulo.toLowerCase().indexOf(buscar.toLowerCase()) !== -1);
  }

  async deleteNote(id: string) {
    try {
      this.servAlert.getAlertLoading('info', 'Espere Por Favor');
      await this.afs.collection('notes').doc(id).delete();
      this.servAlert.closeAlert();
      this.servAlert.getAlert('success', 'Nota borrada con exito');
      return true;
    } catch (error) {
      this.servAlert.closeAlert();
      this.servAlert.getAlert('error', 'Algo salio mal');
      return false;
    }
  }

  asignarNote(doc: any) {

    let note: Note = {
      id: '',
      created_at: null,
      nota: '',
      titulo: '',
      updated: null,
      usuario: ''
    };
    note = { ...doc.data() as Note };
    note.id = doc.id;
    note.created_at = new Date(doc.data().created_at);
    return note;
  }

}
