import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ecommerce-cart-price',
  templateUrl: './cart-price.component.html',
  styleUrls: ['./cart-price.component.scss']
})
export class CartPriceComponent implements OnInit {
  @Input() productLen;
  @Input() totalPrice;
  @Input() totalDeliveryAmt;
  @Input() totalPayableAmt;
  @Input() currencyCode;

  constructor() { }

  ngOnInit() {
  }

}
