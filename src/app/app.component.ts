import { Component, ViewEncapsulation, OnInit, OnDestroy, Inject, OnChanges } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { PlatformConfig } from '@ecommerce/settings/platform.config';
import { APIService } from '@ecommerce/service/api.service';
import { SharedService } from '@ecommerce/service/shared.service';
import { AuthService } from './auth/auth.service';
import { Subscription, from } from 'rxjs';
import {Constants} from './constants/constants';
import {MetaTags} from './enums/meta-tags';
import { MessageService } from '@ecommerce/service/message.service';
import {LocalStore} from './ecommerce-store/local-store';


@Component({
  selector: 'ecommerce-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {

  custIsAuthenticated = false;
  custName: string;
  private authListenerSubs: Subscription;
  private subscription: Subscription;
  content: any;
  errorData: any;
  alertMsg: any;
  localStore: any;


  constructor(
    private _platformConfig: PlatformConfig,
    private titleService: Title,
    private meta: Meta,
    private apiService: APIService,
    private authService: AuthService,
    private sharedService: SharedService,
    private constants: Constants,
    private msgService: MessageService,
    @Inject(DOCUMENT) private doc
  ) {
    this.localStore = new LocalStore();
  }

  ngOnInit() {
    console.log('_platformConfig (check for browser) => ', this._platformConfig);
    if (this._platformConfig.isBrowser) {
      this.setPageTitle();
      this.createLinkForCanonicalURL();
      this.authService.autoAuthCust();
      this.checkAuthentication();
      this.showMsgAlert();
      this.callLoalStore();
    }
  }

  ngOnChanges() {
    this.checkAuthentication();
    console.log('Piyali');
    this.showMsgAlert();
  }

  callLoalStore() {
    if (this.localStore.getData() === null) {
      this.siteContent();
    } else {
      this.content = this.localStore.getData();
      this.storeLocalStoreDataInService();
    }
  }

  siteContent() {
    try {
      Promise.all([this.apiService.getContent(), this.apiService.getCategories()]).
        then(
          (res) => {
            console.log('Promise all => ', res);
            const arrjoin = Object.assign({}, res[0], res[1]);
            console.log('Join = ', arrjoin);
            this.localStore.setData(arrjoin); /* store site content data in localstorage */
            this.storeLocalStoreDataInService();
          }
        );
    } catch (error) {
      this.errorData = this.sharedService.getErrorKeys(error.statusText);
      console.log(this.errorData);
    }
  }

  storeLocalStoreDataInService() {
    this.content = this.localStore.getData().content[0];
    console.log('this.content => ', this.content);
    this.sharedService.setSiteContent(this.content);
    this.sharedService.setCategories(this.localStore.getData().categories);
  }

  setPageTitle() {
    this.titleService.setTitle(this.constants['title']);
    this.meta.addTag({name: 'keywords', content: MetaTags['keywords']});
    this.meta.addTag({name: 'description', content: MetaTags['description']});
    this.meta.addTag({name: 'author', content: MetaTags['author']});
    this.meta.addTag({name: 'robots', content: MetaTags['robots']});
  }

  createLinkForCanonicalURL() {
    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    link.setAttribute('href', this.doc.URL);
 }

 checkAuthentication() {
  this.custName = this.authService.getCustName()[0];
  this.custIsAuthenticated = this.authService.getIsAuth();
  this.authListenerSubs = this.authService.getLoggedInStatusListener()
    .subscribe(isAuthenticated => {
      this.custIsAuthenticated = isAuthenticated;
      this.custName = this.authService.getCustName()[0];
      console.log('Header Details => ', this.custIsAuthenticated, this.custName);
    });
 }

 showMsgAlert() {
  this.subscription = this.msgService.getMessage().subscribe(message => {
      this.alertMsg = message;
      console.log('showMsgAlert => ', this.alertMsg);
  });
}

ngOnDestroy() {
  this.authListenerSubs.unsubscribe();
}

}


