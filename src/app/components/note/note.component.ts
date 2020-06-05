import { Component, OnInit, Input } from '@angular/core';

import { Note } from '../../interfaces/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;
  noteEjm = `
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Incidunt, reprehenderit. Illo illum ullam perspiciatis
        fugit architecto dolorum aspernatur suscipit eligendi?
  `;

  constructor() { }

  ngOnInit(): void {
  }

}
