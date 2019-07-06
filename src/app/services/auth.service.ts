import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';



@Injectable()
export class AuthService {

  loggedUser: any;


  constructor (private angularFireAuth: AngularFireAuth) { 

    this.loggedUser = null;

  }


  getLoggedUser() {

    return this.loggedUser;

  }


  isLogged() {

    return this.angularFireAuth.authState;

  }


  login(email: string, password: string) {

    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);

  }


  loginFacebook() {

    return this.angularFireAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );

  }


  logout() {

    return this.angularFireAuth.auth.signOut();

  }


  register(email: string, password: string) {

    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);

  }


  setLoggedUser(loggedUser: any) {

    this.loggedUser = loggedUser;
   
  }

}
