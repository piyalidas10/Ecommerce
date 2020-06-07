import {
  Component, Input, OnInit,
  ComponentFactoryResolver, ViewContainerRef, ViewChild, ElementRef, Renderer2, AfterContentInit, ChangeDetectionStrategy
} from '@angular/core';
import { ComponentLoaderService } from '@ecommerce/service/modal.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModalDialogComponent implements OnInit, AfterContentInit {
  @Input() title: string;
  @Input() componentData: string;
  @Input() componentName: any;
  public name: any;

  @ViewChild('datacontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(
    private el: ElementRef,
    private ren: Renderer2,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private loaderService: ComponentLoaderService
  ) {}

  public div = this.ren.createElement('div');

  ngOnInit() {}

  ngAfterContentInit() {
    this.ren.addClass(this.el.nativeElement.ownerDocument.body, 'modal-open');
    this.ren.appendChild(this.el.nativeElement, this.div);
    this.ren.setAttribute(this.div , 'class', 'modal-backdrop fade in');
    this.createModalPopup();
  }

  createModalPopup() {
    const name = this.loaderService.getComponent(this.componentName);
    console.log('********************************** => ', name);
    const myFactory = this.resolver.resolveComponentFactory(<any>name);
    const myRef = this.entry.createComponent(myFactory);
    myRef.instance['data'] = this.componentData;
  }

  closeModal() {
    this.ren.removeClass(this.el.nativeElement.ownerDocument.body, 'modal-open');
    this.ren.removeChild(this.el.nativeElement, this.div);
    this.el.nativeElement.remove();
  }


}

