// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:3000/',
  API_CATEGORY_PATH: 'api/categories',
  API_CONTENT_PATH: 'api/content',
  API_PRODUCT_LIST_PATH: 'api/products',
  API_PRODUCT_DETAILS_PATH: 'api/products/productdetails',
  API_PRODUCT_ADD_PATH: '',
  API_PRODUCT_DELETE_PATH: '',
  API_REGISTER_PATH: 'api/auth/register',
  API_LOGIN_PATH: 'api/auth/login',
  API_CART_PATH: 'api/cart',
  API_CART_CHECK_PRODUCT: 'api/cart/check',
  API_CUSTOMERSBYYEAR: 'api/admin/customersbyyear',
  API_CUTOMERSBYGENDER: 'api/admin/customersbygender',
  API_PRODUCTSBYCATEGORY: 'api/admin/productsbycategory',
  IMAGE_PATH: 'images/products/',
  ERROR_MSG_PATH: 'api/errors',
  VALIDATION_ERROR_MSG_PATH: 'api/validationerrors'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
