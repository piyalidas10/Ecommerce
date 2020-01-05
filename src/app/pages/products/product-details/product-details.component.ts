import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { APIService } from '../../../service/api.service';
import { SharedService } from '../../../service/shared.service';
import { AuthService } from '../../../auth/auth.service';
import { MessageService } from '../../../service/message.service';
import { Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
const BACKEND_URL = environment.apiEndpoint;


@Component({
  selector: 'ecommerce-product-details',
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
  custIsAuthenticated = false;
  custFname: string;
  custMname: string;
  custLname: string;
  custToken: string;
  custEmail: string;
  private authListenerSubs: Subscription;
  isProductInCartPresent: Boolean = false;

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
    private apiService: APIService,
    private sharedService: SharedService,
    private authService: AuthService,
    private msgService: MessageService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd)
    ).subscribe(event => {
      this.titleService.setTitle(this.titleCaseWord(event['snapshot'].params['id']) + ' ' + event['snapshot'].data['title']);
    });
    this.imgURL = BACKEND_URL + environment.IMAGE_PATH;
    this.getSessionInfo();
  }

  ngOnInit() {
    this.errorMsg();
    this.Activatedroute.params.subscribe(params => {
      this.productId = params['id'];
      console.log('productId', this.productId);
      this.fetchProductInfo(this.productId);
      this.checkProductInCart(this.custEmail);
    });
  }

  fetchProductInfo(id) {
    this.apiService.getProductDetails(id)
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
    console.log('this.statusTxt ', this.statusTxt);
  }

  checkPath(imgsrc): string {
    if (imgsrc === undefined || imgsrc === '') {
      this.pic = 'empty_product.svg';
    } else {
      this.pic = imgsrc;
    }
    return this.pic;
  }

  getSessionInfo() {
    this.custToken = this.authService.getToken();
    this.custEmail = this.authService.getCustMail();
    this.custFname = this.authService.getCustName()[0];
    this.custMname = this.authService.getCustName()[1];
    this.custLname = this.authService.getCustName()[2];
    this.custIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getLoggedInStatusListener()
      .subscribe(isAuthenticated => {
        this.custIsAuthenticated = isAuthenticated;
        this.custEmail = this.authService.getCustMail();
        this.custFname = this.authService.getCustName()[0];
        this.custMname = this.authService.getCustName()[1];
        this.custLname = this.authService.getCustName()[2];
        this.custToken = this.authService.getToken();
      });
  }

  addtocart() {
    const sessionInfo = {
      email: this.custEmail,
      isLoggedIn: this.custIsAuthenticated,
      firstName: this.custFname,
      middleName: this.custMname,
      lastName: this.custLname,
      secureToken: this.custToken
    };
    this.apiService.addToCart(sessionInfo, this.productDt)
      .subscribe(
        data => {
          console.log('cartdata => ', data);
          this.router.navigate(['/cart']);
        },
        err => {
          this.errorData = this.sharedService.getErrorKeys(err.statusText);
          this.msgService.error(this.errorData, true);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
    );
  }

  checkProductInCart(email) {
    this.apiService.isAvailableInCart(email).subscribe(
      data => {
        if (data.productsInCart[0].cartResponse.length > 0) {
          const cartProducts = data.productsInCart[0].cartResponse;
          cartProducts.forEach(element => {
            if (element.productId === this.productId) {
              this.isProductInCartPresent = true;
            } else {
              this.isProductInCartPresent = false;
            }
          });
        }
        this.isLoading = false;
      },
      err => {
        this.errorData = this.sharedService.getErrorKeys(err.statusText);
        this.msgService.error(this.errorData, true);
        this.isLoading = false;
      }
    );
  }

  gotocart() {
    this.router.navigate(['/cart']);
  }

  errorMsg() {
    this.apiService.getErrorMessage().then(
      (res) => {
        if (this.sharedService.errorObj.length === 0) {
          this.sharedService.errorObj = res['srverrors'][0]['errorslist'];
          console.log('erroJson => ', this.sharedService.errorObj);
        }
      }, (error) => {
      });
  }

}
