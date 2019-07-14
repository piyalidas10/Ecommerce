import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {
  private _count = 0;
  private _serviceId: string = 'idleTimeoutSvc-' + Math.floor(Math.random() * 10000);
  private _timeoutMilliseconds = 15000;
  private timerSubscription: Subscription;
  private timer: Observable<number>;
  private _timer: Observable<number>;
  private resetOnTrigger: Boolean = false;
  private lastTime: number;
  private dateTimer: Observable<number>;
  private dateTimerSubscription: Subscription;
  private dateTimerInterval: number = 1000 * 60 * 5;
  private dateTimerTolerance: number = 1000 * 10;
  public timeoutExpired: Subject<number> = new Subject<number>();

  constructor() {
      console.log('Constructed idleTimeoutService ' + this._serviceId);

      this.timeoutExpired.subscribe(n => {
          console.log('timeoutExpired subject next.. ' + n.toString());
      });

      this.startTimer();
      this.startDateCompare();
  }

  private setSubscription() {
      this._timer = timer(this._timeoutMilliseconds);
      this.timerSubscription = this._timer.subscribe(n => {
          this.timerComplete(n);
      });
  }

  private startDateCompare() {
      this.lastTime = (new Date()).getTime();
      this.dateTimer = timer(this.dateTimerInterval); // compare every five minutes
      this.dateTimerSubscription = this.dateTimer.subscribe(n => {
          const currentTime: number = (new Date()).getTime();
          if (currentTime > (this.lastTime + this.dateTimerInterval + this.dateTimerTolerance)) { // look for 10 sec diff
              console.log('Looks like the machine just woke up.. ');
          }  else {
              console.log('Machine did not sleep.. ');
          }
          this.dateTimerSubscription.unsubscribe();
          this.startDateCompare();
      });
  }

  public startTimer() {
      if (this.timerSubscription) {
          this.stopTimer();
      }

      this.setSubscription();
  }

  public stopTimer() {
      this.timerSubscription.unsubscribe();
  }

  public resetTimer() {
      this.startTimer();
  }

  private timerComplete(n: number) {
      this.timeoutExpired.next(++this._count);

      if (this.resetOnTrigger) {
          this.startTimer();
      }
  }
}
