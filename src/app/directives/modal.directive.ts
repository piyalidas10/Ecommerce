import { Directive, Input, Output, EventEmitter, ElementRef, HostListener,
    Renderer2, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ModalDialogComponent } from '@ecommerce/shared/modal-dialog/modal-dialog.component';

@Directive({
  selector: '[ecommerce-modal-box]'
})
export class ModalDirective {
  @Input() title: string;
  @Input() componentData: string;
  @Input() componentName: string;


  @HostListener('click', ['$event'])

  /* modal create */
  openModal() {
    this.createModalDialog(ModalDialogComponent);
  }

  constructor(
        private el: ElementRef,
        private ren: Renderer2,
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  createModalDialog(modalDialogComponent) {
    this.viewContainer.clear();
    const modalDialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(modalDialogComponent);
    const modalDialogComponentRef = this.viewContainer.createComponent(modalDialogComponentFactory);
    modalDialogComponentRef.instance['title'] = this.title;
    modalDialogComponentRef.instance['componentData'] = this.componentData;
    modalDialogComponentRef.instance['componentName'] = this.componentName;
    return modalDialogComponentRef;
  }



}
