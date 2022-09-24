import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class PushNotificationService {
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(
      // (_messaging) => {
      //     _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      //     _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      // }
    )
  }
}


