import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar
} from '@angular/material';
import { NotesService } from 'src/app/services/notes.service';



@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})



export class BottomSheetComponent {

  actionTitle: string;
  categories: string[];
  note: any;
  snackBarRef: MatSnackBarRef<SimpleSnackBar>;


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private notesService: NotesService,
    private snackBar: MatSnackBar
  ) {

    this.categories = ['important', 'work', 'other'];

    if (data) {
      this.actionTitle = 'Edit note';
      this.note = data;
    } else {
      this.actionTitle = 'Add new note';
      this.note = { title: null, msgBody: null, category: this.categories[0] };
    }

  }


  saveNote() {

    this.notesService.createNote(this.note)
    .then(
      () => {
        this.snackBarRef = this.snackBar.open(
          'The note was successfully saved',
          'Close',
          {duration: 10000}
        );
        this.bottomSheetRef.dismiss();
      }
    )
    .catch(
      (error) => {
        this.snackBar.open(
          error.code,
          null,
          {duration: 1500}
        );
      }
    );

  }

}
