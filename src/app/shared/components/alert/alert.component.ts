import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '@ecommerce/service/message.service';

@Component({
  selector: 'ecommerce-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  @Input() alertMsg;

  constructor(private msgService: MessageService) { }

  ngOnInit() {
  }

}
