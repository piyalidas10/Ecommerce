import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map, flatMap } from 'rxjs/operators';
import { PlatformConfig } from '@ecommerce/settings/platform.config';
import { APIService } from '@ecommerce/service/api.service';
import { SharedService } from '@ecommerce/service/shared.service';

@Component({
  selector: 'ecommerce-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slideCt = [];
  isLoading: Boolean = true;
  errorData: any;

  constructor(
    private _platformConfig: PlatformConfig,
    private router: Router,
    private titleService: Title,
    private apiService: APIService,
    private sharedService: SharedService
  ) {
        this.router.events.pipe(
          filter(event => event instanceof ActivationEnd)
        ).subscribe(event => {
          this.titleService.setTitle(event['snapshot'].data['title']);
        });
  }

  ngOnInit() {
    if (this._platformConfig.isBrowser) {
      this.sliderContent();
    }
  }

  async sliderContent() {
    try {
      // "await" will wait for the promise to resolve or reject
      // if it rejects, an error will be thrown, which you can
      // catch with a regular try/catch block
      await this.sharedService.content.
        subscribe(
          (res) => {
            this.slideCt = res['slider'];
            this.isLoading = false;
          }
        );
    } catch (error) {
      this.errorData = this.sharedService.getErrorKeys(error.statusText);
      this.isLoading = false;
      console.log('errorData => ', this.errorData);
    }
  }

}
