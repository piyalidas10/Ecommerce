import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { APIService } from '../../../service/api.service';
import { SharedService } from '../../../service/shared.service';

import { environment } from '../../../../environments/environment';
const BACKEND_URL = environment.apiEndpoint;


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
  isLoading: Boolean = true;
  errorData: any;
  statusTxt: {};

  titleCaseWord(word: string) {
    if (!word) {
      return word;
    } else {
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
  }

  constructor(
    private titleService: Title,
    private router: Router,
    private Activatedroute: ActivatedRoute,
    private productsData: APIService,
    private sharedService: SharedService,
    private el: ElementRef
  ) {
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd)
    ).subscribe(event => {
      this.titleService.setTitle(this.titleCaseWord(event['snapshot'].params['id']) + ' ' + event['snapshot'].data['title']);
    });
    this.imgURL = BACKEND_URL + environment.IMAGE_PATH;
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
          this.productDt = data.productinfo;
          console.log(this.productDt);
          this.isLoading = false;
          this.checkProductQuantity(this.productDt['Quantity']);
        },
        err => {
          this.errorData = this.sharedService.getErrorKeys(err.statusText);
          this.isLoading = false;
        }
      );
  }

  checkProductQuantity(qantity: Number) {
    if (qantity === 0) {
      this.statusTxt = {type: 'not-available', text: 'Product Unavailable'};
    } else if (qantity < 5) {
      this.statusTxt = {type: 'few-available', text: 'Hurry, Only ' + qantity + ' left!'};
    } else {
      this.statusTxt = {type: 'available', text: 'Available'};
    }
  }

  checkPath(imgsrc): string {
    if (imgsrc === undefined || imgsrc === '') {
      this.pic = 'empty_product.svg';
    } else {
      this.pic = imgsrc;
    }
    console.log('Pic => ', this.pic);
    return this.pic;
  }

}
