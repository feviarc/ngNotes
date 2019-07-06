import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';



export interface DialogData {
  message: string;
  cancelButtonTitle: string;
  acceptButtonTitle: string;
}



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})



export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogComponent>
  ) { }


  ngOnInit() { }


  onNoClick() {
    this.dialogRef.close();
  }

}
