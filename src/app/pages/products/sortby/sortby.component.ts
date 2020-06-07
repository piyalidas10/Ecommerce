import { Component, OnInit, ElementRef, OnChanges, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import {Constants} from '@ecommerce/constants/constants';
import { PlatformConfig } from '@ecommerce/settings/platform.config';

@Component({
  selector: 'ecommerce-sortby',
  templateUrl: './sortby.component.html',
  styleUrls: ['./sortby.component.scss']
})
export class SortbyComponent implements OnInit, OnChanges, AfterViewInit {
  selectedOpt: string;
  type: Array<string>;
  @Output() changeEvent = new EventEmitter<any>();
  @ViewChild('selectSort') selectSort: ElementRef;

  constructor(
    private _platformConfig: PlatformConfig,
    private constants: Constants) { }

  ngOnInit() {
    this.type = [this.constants['sortbyPrice_L2H'], this.constants['sortbyPrice_H2L'], this.constants['sortbyPrice_NF']];
  }

  ngAfterViewInit() {
    if (this._platformConfig.isBrowser) {
      this.firstSelect();
    }
  }

  ngOnChanges() {

  }

  firstSelect() {
    const selElement = this.selectSort.nativeElement.querySelectorAll('li');
    selElement.forEach((item, index) => {
      if (index === 2) {
        item.classList.add('active');
      }
    });
  }

  sortByFunc(event, index) {
    const allElement = event.target.parentElement.querySelectorAll('li');
    console.log('sortByFunc', allElement);
    allElement.forEach( (li) => {
      li.classList.remove('active');
    });
    if (!event.target.classList.contains('active')) {
      event.target.classList.add('active');
    } else {
      event.target.classList.remove('active');
    }
    this.selectedOpt = event.target.innerText;
    this.changeEvent.emit(this.selectedOpt);
  }

}
