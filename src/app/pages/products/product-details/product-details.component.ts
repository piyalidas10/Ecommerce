import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../../../service/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: string;
  constructor(private Activatedroute: ActivatedRoute, private productsData: APIService) { }

  ngOnInit() {
    this.Activatedroute.params.subscribe(params => {
      this.productId = params['id'];
      console.log(this.productId);
      this.fetchProductInfo(this.productId);
    });
  }

  fetchProductInfo(id) {
    this.productsData.getProductDetails(id)
      .then(
        (res) => {
          console.log(res);
        }
      );
  }

}
