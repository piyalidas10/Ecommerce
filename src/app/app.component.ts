import { Component, ViewEncapsulation, OnInit, OnDestroy, Inject, OnChanges } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { APIService } from './service/api.service';
import { SharedService } from './service/shared.service';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import {Constants} from './constants/constants';

@Component({
  selector: 'ecommerce-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {

  isLoading: Boolean = true;
  custIsAuthenticated = false;
  custName: string;
  private authListenerSubs: Subscription;
  content = [];
  errorData: any;

  constructor(
    private titleService: Title,
    private meta: Meta,
    private apiService: APIService,
    private authService: AuthService,
    private sharedService: SharedService,
    private constants: Constants,
    @Inject(DOCUMENT) private doc
  ) {
    this.siteContent();
  }

  ngOnInit() {
    this.setPageTitle();
    this.createLinkForCanonicalURL();
    this.authService.autoAuthCust();
    this.checkAuthentication();
  }

  ngOnChanges() {
    this.checkAuthentication();
    console.log('Piyali');
  }

  async siteContent() {
    try {
      // "await" will wait for the promise to resolve or reject
      // if it rejects, an error will be thrown, which you can
      // catch with a regular try/catch block
      await this.apiService.getContent().
        then(
          (res) => {
            this.content = res['content'][0];
            console.log('this.content => ', this.content);
            this.isLoading = false;
            this.sharedService.setSiteContent(this.content);
          }
        );
    } catch (error) {
      this.errorData = this.sharedService.getErrorKeys(error.statusText);
      this.isLoading = false;
      console.log(this.errorData);
    }
  }

  setPageTitle() {
    this.titleService.setTitle(this.constants['title']);
    this.meta.addTag({name: 'keywords', content: this.constants['meta_keywords']});
    this.meta.addTag({name: 'description', content: this.constants['meta_description']});
    this.meta.addTag({name: 'author', content: this.constants['meta_author']});
    this.meta.addTag({name: 'robots', content: this.constants['meta_robots']});
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

ngOnDestroy() {
  this.authListenerSubs.unsubscribe();
}

}


