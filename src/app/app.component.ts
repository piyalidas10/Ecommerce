import { Component, ViewEncapsulation, OnInit, OnDestroy, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { AppConfig } from './settings/app.config';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Ecommerce POC by Piyali Das';
  custIsAuthenticated = false;
  custName: string;
  private authListenerSubs: Subscription;

  constructor(
    private titleService: Title,
    private meta: Meta,
    private config: AppConfig,
    private authService: AuthService,
    @Inject(DOCUMENT) private doc
  ) {}

  ngOnInit() {
    this.setAppConfig();
    this.setPageTitle();
    this.createLinkForCanonicalURL();
    this.authService.autoAuthCust();
    this.checkAuthentication();
  }

  setAppConfig() {
    console.log('appConfig', this.config.protocol);
  }

  setPageTitle() {
    this.titleService.setTitle(this.title);
    this.meta.addTag({name: 'keywords', content: 'Angular Project, Ecommerce Project'});
    this.meta.addTag({name: 'description', content: 'Angular project POC by Piyali Das'});
    this.meta.addTag({name: 'author', content: 'Piyali Das'});
    this.meta.addTag({name: 'robots', content: 'index, follow'});
  }

  createLinkForCanonicalURL() {
    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    link.setAttribute('href', this.doc.URL);
 }

 checkAuthentication() {
  // this.custName = this.authService.getCustName();
  // this.custIsAuthenticated = this.authService.getIsAuth();
  this.authListenerSubs = this.authService.getLoggedInStatusListener()
    .subscribe(isAuthenticated => {
      this.custIsAuthenticated = isAuthenticated;
      this.custName = this.authService.getCustName();
      console.log('Header Details => ', this.custIsAuthenticated, this.custName);
    });
 }

ngOnDestroy() {
  this.authListenerSubs.unsubscribe();
}

}


