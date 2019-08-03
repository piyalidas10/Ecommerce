import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../../service/api.service';
import { AppConfig } from '../../../settings/app.config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: string;
  imgURL: string;
  pic: string;
  productDt = {};

  constructor(
    private Activatedroute: ActivatedRoute,
    private productsData: APIService,
    private appConfig: AppConfig
  ) {
    this.imgURL = appConfig.protocol + appConfig.apiEndpoint + appConfig.IMAGE_PATH;
  }

  ngOnInit() {
    this.Activatedroute.params.subscribe(params => {
      this.productId = params['id'];
      console.log('productId', this.productId);
      this.fetchProductInfo(this.productId);
    });
  }

  fetchProductInfo(id) {
    this.productsData.getProductDetails(id)
      .subscribe(
        data => {
          this.productDt = data;
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }

  checkPath(imgsrc): string {
    if (imgsrc === undefined || imgsrc === '') {
      this.pic = 'empty_product.svg';
    } else {
      this.pic = imgsrc;
    }
    return this.pic;
  }

}
