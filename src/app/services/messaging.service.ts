import { Injectable } from '@angular/core';
// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
// RxJS
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';



@Injectable()
export class MessagingService {

  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(undefined);


  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }


  getPermission() {

    this.messaging.requestPermission()
    .then(
      () => {
        return this.messaging.getToken();
      }
    )
    .then(
      (token) => {
        this.updateToken(token);
      }
    )
    .catch(
      (error) => {
        console.log('Unable to get permission to notify.', error);
      }
    );

  }


  receiveMessage() {

    return this.messaging;

  }


  updateToken(token) {

    this.afAuth.authState.take(1).subscribe(
      (user) => {
        if (!user) { return; }
        const data = { [user.uid]: token };
        this.db.object('fcmTokens/').update(data);
      }
    );

  }

}
