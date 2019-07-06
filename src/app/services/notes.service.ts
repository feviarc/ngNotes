import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';



@Injectable()
export class NotesService {

  constructor(
    private afDB: AngularFireDatabase,
    private authService: AuthService) {

  }


  public getNotes(uid: string) {

    return this.afDB.list(`/${uid}/`);

  }


  public createNote(note: any) {

    if (!note.id) {
      note.id = this.afDB.createPushId();
      note.created = Date.now();
    }

    return this.afDB.database.ref('/' + this.authService.getLoggedUser().uid + '/' + note.id).set(note);

  }


  public editNote(note: any) {

    return this.afDB.database.ref('/' + this.authService.getLoggedUser().uid + '/' + note.id).set(note);

  }


  public deleteNote(id) {

    return this.afDB.database.ref('/' + this.authService.getLoggedUser().uid + '/' + id).remove();

  }

}
