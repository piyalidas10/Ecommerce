import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'ecommerce-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeSliderComponent implements OnInit, AfterViewInit {
  @Input() sliderData;
  @ViewChild('sliderBox') sliderRef: ElementRef;

  constructor() {}

  ngOnInit() {
    console.log('sliderData => ', this.sliderData);
  }

  ngAfterViewInit() {
    const list = this.sliderRef.nativeElement.querySelectorAll('.carousel-indicators > li');
    for (let i = 0; i < list.length; i++) {
      list[0].classList.add('active');
    }
    const items = this.sliderRef.nativeElement.querySelectorAll('.carousel-item');
    for (let i = 0; i < items.length; i++) {
      items[0].classList.add('active');
    }
  }

  showArraow() {
    const leftArrow = this.sliderRef.nativeElement.querySelector('.carousel-control-prev').style;
    const rightArrow = this.sliderRef.nativeElement.querySelector('.carousel-control-next').style;
    leftArrow.left = '0';
      leftArrow.opacity = '1';
      rightArrow.right = '0';
      rightArrow.opacity = '1';
  }

  hideArraow() {
    const leftArrow = this.sliderRef.nativeElement.querySelector('.carousel-control-prev').style;
    const rightArrow = this.sliderRef.nativeElement.querySelector('.carousel-control-next').style;
    leftArrow.left = '-70px';
      leftArrow.opacity = '0';
      rightArrow.right = '-70px';
      rightArrow.opacity = '0';
  }

}
