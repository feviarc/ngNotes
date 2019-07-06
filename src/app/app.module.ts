/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// Service Worker
import { ServiceWorkerModule } from '@angular/service-worker';
// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatDialogModule
} from '@angular/material';
// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

/* Environment */
import { environment } from '../environments/environment';

/* Services */
import { AuthService } from './services/auth.service';
import { MessagingService } from './services/messaging.service';
import { NotesService } from './services/notes.service';

/* Components */
import { AppComponent } from './app.component';
import { BottomSheetComponent} from './components/bottom-sheet/bottom-sheet.component';
import { DialogComponent } from './components/dialog/dialog.component';



// Put here your own firebase Database Connection Settings
const firebaseConfig = {
    apiKey: '***************************************',
    authDomain: 'feviarc-platzinotas.firebaseapp.com',
    databaseURL: 'https://feviarc-platzinotas.firebaseio.com',
    projectId: 'feviarc-platzinotas',
    storageBucket: 'feviarc-platzinotas.appspot.com',
    messagingSenderId: '************'
};



@NgModule({
  declarations: [
    AppComponent,
    BottomSheetComponent,
    DialogComponent,
  ],
  entryComponents: [
    BottomSheetComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatBottomSheetModule,
    MatChipsModule,
    MatDialogModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    NotesService,
    AuthService,
    AngularFireAuth,
    MessagingService
  ],
  bootstrap: [AppComponent],
})



export class AppModule { }
