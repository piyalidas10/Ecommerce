import { Injectable, isDevMode } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class AppConfig {
    apiEndpoint: string;
    API_CATEGORY_PATH: string;
    API_CONTENT_PATH: string;
    API_PRODUCT_LIST_PATH: string;
    API_PRODUCT_DETAILS_PATH: string;
    API_PRODUCT_ADD_PATH: string;
    API_PRODUCT_DELETE_PATH: string;
    API_REGISTER_PATH: string;
    API_LOGIN_PATH: string;
    API_CART_PATH: string;
    API_CART_CHECK_PRODUCT: string;
    API_CART_ADD_PRODUCT_QUANTITY: string;
    API_CART_DELETE_PRODUCT_QUANTITY: string;
    API_CART_REMOVE_PRODUCT: string;
    API_CUSTOMERSBYYEAR: string;
    API_CUTOMERSBYGENDER: string;
    API_PRODUCTSBYCATEGORY: string;
    IMAGE_PATH: string;
    ERROR_MSG_PATH: string;
    VALIDATION_ERROR_MSG_PATH: string;

    envDevMode: Boolean;

    constructor() {
        console.log('Environment in Development mode => ', isDevMode());
        this.envDevMode = isDevMode();
        if (this.envDevMode) {
            this.apiEndpoint = 'http://localhost:3000/';
        } else {
            this.apiEndpoint = 'https://piyali-ecommerce.herokuapp.com/';
        }
        this.API_CATEGORY_PATH = 'api/categories';
        this.API_CONTENT_PATH = 'api/content';
        this.API_PRODUCT_LIST_PATH = 'api/products';
        this.API_PRODUCT_DETAILS_PATH = 'api/products/productdetails';
        this.API_PRODUCT_ADD_PATH = '';
        this.API_PRODUCT_DELETE_PATH = '';
        this.API_REGISTER_PATH = 'api/auth/register';
        this.API_LOGIN_PATH = 'api/auth/login';
        this.API_CART_PATH = 'api/cart';
        this.API_CART_CHECK_PRODUCT = 'api/cart/check';
        this.API_CART_ADD_PRODUCT_QUANTITY = 'api/cart/addqty';
        this.API_CART_DELETE_PRODUCT_QUANTITY = 'api/cart/deleteqty';
        this.API_CART_REMOVE_PRODUCT = 'api/cart/removeprod';
        this.API_CUSTOMERSBYYEAR = 'api/admin/customersbyyear';
        this.API_CUTOMERSBYGENDER = 'api/admin/customersbygender';
        this.API_PRODUCTSBYCATEGORY = 'api/admin/productsbycategory';
        this.IMAGE_PATH = 'images/products/';
        this.ERROR_MSG_PATH = 'api/errors';
        this.VALIDATION_ERROR_MSG_PATH = 'api/validationerrors';
    }
}
