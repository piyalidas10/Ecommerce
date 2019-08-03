import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { AppConfig } from './settings/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit {

  title = 'Ecommerce POC by Piyali Das';

  constructor(
    private titleService: Title,
    private meta: Meta,
    private config: AppConfig,
    @Inject(DOCUMENT) private doc
  ) {}

  ngOnInit() {
    this.setAppConfig();
    this.setPageTitle();
    this.createLinkForCanonicalURL();
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

}


