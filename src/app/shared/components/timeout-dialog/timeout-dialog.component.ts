import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ecommerce-timeout-dialog',
  templateUrl: './timeout-dialog.component.html',
  styleUrls: ['./timeout-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeoutDialogComponent implements OnInit {

  @Input() title;
  @Input() message;
  @Input() showCancel = false;
  @Input() confirmText: String = 'Ok';
  @Input() cancelText: String = 'Cancel';

  constructor(public activeModal: NgbActiveModal, public changeRef: ChangeDetectorRef) {
    // console.log("DialogComponent construct");
  }

  ngOnInit() {
    // console.log("DialogComponent init");
  }

}
