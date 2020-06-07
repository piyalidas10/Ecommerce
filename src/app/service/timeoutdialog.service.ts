import { Injectable, Component, Input, OnInit, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { NgbModal, NgbModalOptions, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TimeoutDialogComponent } from '@ecommerce/shared/components/timeout-dialog/timeout-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class TimeoutdialogService {

  constructor(private modalService: NgbModal) { }

    public confirm() {
        const modalRef = this.modalService.open(TimeoutDialogComponent);

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
        const modalRef = this.modalService.open(TimeoutDialogComponent, options);

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
