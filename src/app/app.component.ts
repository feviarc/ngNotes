import { DialogComponent } from './components/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
// Service Worker
import { SwUpdate } from '@angular/service-worker';
// Angular-Material
import {
  MatBottomSheet,
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
  MatDialog
} from '@angular/material';
// App Services
import { ConnectionService } from 'ng-connection-service';
import { AuthService } from './services/auth.service';
import { MessagingService } from './services/messaging.service'; // Push Notificactions
import { NotesService } from './services/notes.service';
// Components
import {BottomSheetComponent} from '../app/components/bottom-sheet/bottom-sheet.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  cloudMsg: any; // Firebase Cloud Message
  cloudStatus: string;
  email: FormControl;
  hiddenPassword: boolean;
  loggedIn: boolean;
  loggedUser: any;
  loginParams: any;
  notes: any[];
  panelOpenState: boolean;
  registerParams: any;
  snackBarRef: MatSnackBarRef<SimpleSnackBar>;



  constructor(
    private authService: AuthService,
    private bottomSheet: MatBottomSheet,
    private connectionService: ConnectionService,
    public dialog: MatDialog,
    public messagingService: MessagingService,
    private notesService: NotesService,
    private snackBar: MatSnackBar,
    private swUpdate: SwUpdate
  ) {

    this.cloudMsg = null;
    this.cloudStatus = window.navigator.onLine ? 'cloud_queue' : 'cloud_off';
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.hiddenPassword = true;
    this.loggedIn = true;
    this.loginParams = {email: null, password: null};
    this.panelOpenState = false;
    this.registerParams = {};


    authService.isLogged().subscribe(
      (userInfo) => {

        if (userInfo && userInfo.uid) {

          this.loggedIn = true;
          this.loggedUser = userInfo;
          this.authService.setLoggedUser(userInfo);

          notesService.getNotes(userInfo.uid).valueChanges().subscribe(
            (notesList) => {
              this.notes = notesList;
            }
          );

        } else {
          this.loggedIn = false;
          this.loggedUser = null;
        }

      },
      (error) => {
        this.loggedIn = false;
      }
    );

    connectionService.monitor().subscribe(
      (isConnected) => {
        if (isConnected) {
          this.cloudStatus = 'cloud_queue';
        } else {
          this.cloudStatus = 'cloud_off';
        }
      }
    );

    if (this.loggedIn) {
      this.messagingService.getPermission();
      this.messagingService.receiveMessage().onMessage(
        (payload) => {
          this.cloudMsg = payload;
          console.log('cloudMsg', this.cloudMsg);
        }
      );
    }

  }


  ngOnInit() {

    // Check if the browser supports Service Workers
    if (this.swUpdate.isEnabled) {
      // Update Service Worker when a change has been detected
      this.swUpdate.available.subscribe(
        () => {
          window.location.reload();
        }
      );
    }

  }


  deleteNote(note: any) {

    const dialogRef = this.dialog.open(
      DialogComponent,
      {
        width: '300px',
        data: {
          message: `Do you want to delete ${note.title}?`,
          cancelButtonTitle: 'NO',
          acceptButtonTitle: 'YES'
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      (confirmation) => {
        if (confirmation) {
          this.notesService.deleteNote(note.id)
          .then(
            () => {
              this.snackBar.open(
                `${note.title} was eliminated`,
                null,
                {duration: 1500}
              );
            }
          )
          .catch(
            (error) => {
              this.snackBar.open(
                error.message,
                null,
                {duration: 1500}
              );
            }
          );
        }
      }
    );

  }


  loginWithFacebook() {

    this.authService.loginFacebook();

  }


  logIn() {

    this.authService.login(this.loginParams.email, this.loginParams.password)
    .catch(
      (error) => {
        this.snackBar.open(
          error.message,
          'Close',
          {duration: 10000}
        );
      }
    );

    this.loginParams.password = '';

  }


  logOut() {

    const dialogRef = this.dialog.open(
      DialogComponent,
      {
        width: '300px',
        data: {
          message: 'Do you really want to log out?',
          cancelButtonTitle: 'NO',
          acceptButtonTitle: 'YES'
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      (confirmation) => {
        if (confirmation) {
          this.authService.logout();
        }
      }
    );

  }


  getErrorMessage() {

    let errorMsg = '';

    if (this.email.hasError('required')) {
      errorMsg = 'You must enter a valid email address';
    }

    return errorMsg;

  }


  writeANote(note: any) {

    this.bottomSheet.open(BottomSheetComponent, {data: note});

  }


  signIn() {

    this.authService.register(this.registerParams.email, this.registerParams.password)
    .then(
      (response) => {
        this.snackBar.open(
          'The user account was successfully registered',
          null,
          {duration: 1500}
        );
      }
    )
    .catch(
      (error) => {
        this.snackBarRef = this.snackBar.open(
          error.message,
          null,
          {duration: 1500}
        );
      }
    );

  }

}
