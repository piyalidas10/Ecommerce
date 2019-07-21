import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { APIService } from '../../../service/api.service';
import { AppConfig } from '../../../settings/app.config';

import { SidebarFilterComponent } from '../sidebar-filter/sidebar-filter.component';
import { UpperCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products = [];
  pic: string;
  nopic: string;
  option: string;
  isLoading: Boolean = true;
  imgURL: string;
  errorData: string;
  productObsv: Subscription;

  @Output() productDetailsEvent = new EventEmitter<any>();

  titleCaseWord(word: string) {
    if (!word) {
      return word;
    } else {
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
  }

  constructor(
    private titleService: Title,
    private productsData: APIService,
    private appConfig: AppConfig,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.router.events.pipe(
        filter(event => event instanceof ActivationEnd)
      ).subscribe(event => {
        this.titleService.setTitle(this.titleCaseWord(event['snapshot'].params['cat']) + ' ' + event['snapshot'].data['title']);
      });
      this.imgURL = appConfig.protocol + appConfig.apiEndpoint + appConfig.IMAGE_PATH;
  }

  ngOnInit() {
    this.listAppliances();
    this.option = 'Newest First';
    this.sortbyMessage(this.option);
  }

  listAppliances(): void {
    try {
        this.route.params.subscribe(params => {
          const cat = params['cat'];
          console.log(cat);
          this.productObsv = this.productsData.getProducts(cat).
            subscribe(
              data => {
                this.products = [];
                data.forEach(element => {
                  if (element['Category'] === cat) {
                    this.products.push(element);
                  }
                });
                if (this.products.length === 0) {
                  this.nopic = 'empty_product.svg';
                }
                this.isLoading = false;
                console.log(this.products);
              },
              err => {
                this.errorData = err.message;
                this.isLoading = false;
                console.log(err);
              }
            );
        });
      } catch (error) {
        console.log(error);
      }
  }

  checkPath(imgsrc): string {
    if (imgsrc === undefined || imgsrc === '') {
      this.pic = 'empty_product.svg';
    } else {
      this.pic = imgsrc;
    }
    return this.pic;
  }

  productDetails(id): void {
    this.router.navigate(['product/details/' + id]);
  }

  sortbyMessage(event): void {
    this.option = event;
    const SortBy = (x, y) => {
      if (this.option === 'Price -- Low to High') {
        return ((x.Price === y.Price) ? 0 : ((x.Price > y.Price[this.option]) ? 1 : -1));
      } else if (this.option === 'Price -- High to Low') {
        return ((x.Price === y.Price) ? 0 : ((x.Price > y.Price) ? -1 : 1));
      } else if (this.option === 'Newest First') {
        return ((x.DateOfEntry === y.DateOfEntry) ? 0 : ((x.DateOfEntry > y.DateOfEntry) ? 1 : -1));
      } else {
        return ((x.DateOfEntry === y.DateOfEntry) ? 0 : ((x.DateOfEntry > y.DateOfEntry) ? 1 : -1));
      }
    };
    this.products.sort(SortBy);
  }

  changePrice(evt) {
    console.log('Price Change', evt);

  }

  ngOnDestroy() {
    this.productObsv.unsubscribe();
  }

}
