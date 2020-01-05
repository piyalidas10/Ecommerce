import { Component, OnInit, ElementRef, OnChanges, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.type = ['Price -- Low to High', 'Price -- High to Low', 'Newest First'];
  }

  ngAfterViewInit() {
    this.firstSelect();
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
