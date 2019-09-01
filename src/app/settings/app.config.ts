export class AppConfig {
    protocol = 'http://';
    // apiEndpoint = '127.0.0.1:8081/';
    // contentEndpoint = '127.0.0.1:8081/';
    apiEndpoint = 'localhost:3000/';
    contentEndpoint = 'localhost:3000/';
    pageEndpoint = 'localhost:4200/';
    API_CATEGORY_PATH = 'api/categories';
    API_CONTENT_PATH = 'api/content';
    API_PRODUCT_LIST_PATH = 'api/products';
    API_PRODUCT_DETAILS_PATH = 'api/products/productdetails';
    API_PRODUCT_ADD_PATH = '';
    API_PRODUCT_DELETE_PATH = '';
    API_REGISTER_PATH = 'api/auth/register';
    API_LOGIN_PATH = 'api/auth/login';
    IMAGE_PATH = 'assets/images/products/';
    ERROR_MSG_PATH = 'api/errors';
    VALIDATION_ERROR_MSG_PATH = 'api/validationerrors';
}
