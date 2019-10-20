import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../service/message.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnChanges, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private msgService: MessageService) { }

  ngOnInit() {
      this.showMsgAlert();
  }

  ngOnChanges() {
    this.showMsgAlert();
  }

  showMsgAlert() {
    this.subscription = this.msgService.getMessage().subscribe(message => {
        this.message = message;
        console.log('showMsgAlert => ', this.message);
    });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
