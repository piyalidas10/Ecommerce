import { Injectable, Component, Input, OnInit, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { NgbModal, NgbModalOptions, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
  <div class="modal-header">
    <h4 class="modal-title">{{ title }}</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p [innerHTML]="message"></p>
  </div>
  <div class="modal-footer">
    <button *ngIf="showCancel" type="button" class="btn btn-secondary" (click)="activeModal.close(false)">{{ cancelText }}</button>
    <button type="button" class="btn btn-secondary" (click)="activeModal.close(true)">{{ confirmText }}</button>
  </div>
`
})

export class TimeoutdialogComponent implements OnInit {
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

@Injectable({
  providedIn: 'root'
})
export class TimeoutdialogService {

  constructor(private modalService: NgbModal) { }

    public confirm() {
        const modalRef = this.modalService.open(TimeoutdialogComponent);

        const instance = (modalRef as any)._windowCmptRef.instance;
        instance.windowClass = '';

        // setImmediate(() => {
        //    instance.windowClass = 'custom-show'
        // })

        setTimeout(() => {
            instance.windowClass = 'custom-show';
        }, 0);

        const fx = (modalRef as any)._removeModalElements.bind(modalRef);
        (modalRef as any)._removeModalElements = () => {
            instance.windowClass = '';
            setTimeout(fx, 250);
        };

        modalRef.componentInstance.title = 'Discard Changes?';
        modalRef.componentInstance.message = 'Are you sure you want to discard your changes?';
        modalRef.componentInstance.changeRef.markForCheck();
        return modalRef.result;
    }

    public open(title: string, message: string, showCancel: boolean = false, confirmText: string = 'Ok', cancelText: string = 'Cancel',
        options: NgbModalOptions = { size: 'sm' }) {
        const modalRef = this.modalService.open(TimeoutdialogComponent, options);

        const instance = (modalRef as any)._windowCmptRef.instance;

        // setImmediate(() => {
        //    instance.windowClass = "custom-show";
        // })

        setTimeout(() => {
            instance.windowClass = 'custom-show';
        }, 0);

        const fx = (modalRef as any)._removeModalElements.bind(modalRef);
        (modalRef as any)._removeModalElements = () => {
            instance.windowClass = '';
            setTimeout(fx, 250);
        };

        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.showCancel = showCancel;
        modalRef.componentInstance.confirmText = confirmText;
        modalRef.componentInstance.cancelText = cancelText;
        modalRef.componentInstance.changeRef.markForCheck();
        return modalRef.result;
    }
}
