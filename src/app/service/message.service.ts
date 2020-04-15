import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  private alertmsg = new BehaviorSubject<any>({});
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            if (this.keepAfterNavigationChange) {
                // only keep for a single location change
                this.keepAfterNavigationChange = false;
            } else {
                // clear alert
                this.alertmsg.next({});
            }
        }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.alertmsg.next({ type: 'success', text: message });
    console.log('message service success => ', keepAfterNavigationChange);
  }

  error(message: string, keepAfterNavigationChange = false) {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.alertmsg.next({ type: 'error', text: message });
      console.log('message service error => ', this.keepAfterNavigationChange, message);
  }

  getMessage() {
      return this.alertmsg.asObservable();
  }


}
