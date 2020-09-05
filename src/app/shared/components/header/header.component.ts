import {
  Component, OnInit, OnChanges, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy,
  AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2, ViewEncapsulation, Input
} from '@angular/core';
import { APIService } from '@ecommerce/service/api.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '@ecommerce/auth/auth.service';
import { SharedService } from '@ecommerce/service/shared.service';

@Component({
  selector: 'ecommerce-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges {
  userName: string;
  content = [];
  lenMenu: number;
  errorData: any;

  @Input() custStatus;
  @Input() custName;
  @ViewChildren('menuitem') private menuitems: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    private apiService: APIService,
    private sharedService: SharedService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.siteContent();
  }

  ngOnChanges() {
    console.log('On changes', this.custStatus, this.custName);
    this.siteContent();
  }

  ngAfterViewInit() {

  }

  async siteContent() {
    try {
      // "await" will wait for the promise to resolve or reject
      // if it rejects, an error will be thrown, which you can
      // catch with a regular try/catch block
      await this.sharedService.content.
        subscribe(
          (res) => {
            if (res) {
              console.log('header content => ', res);
              if (this.custStatus === false) {
                const pageHeader = 'logout';
                this.content = res['sitePage'].filter((elemt) => elemt.pageHeader !== pageHeader);
              } else {
                const pageHeader = 'login';
                this.content = res['sitePage'].filter((elemt) => elemt.pageHeader !== pageHeader);
                this.checkIndexLogout();
              }
              console.log('Header Menu => ', this.content);
              this.cdr.markForCheck();
            }
          }
        );
    } catch (error) {
      this.errorData = this.sharedService.getErrorKeys(error.statusText);
      console.log(this.errorData);
    }
  }

  /*
    check the index of logout menu
  */
  checkIndexLogout() {
    for (const k in this.content) {
      if (this.content.hasOwnProperty(k)) {
        console.log(this.content[k]);
        if (this.content[k].pageHeader === 'logout') {
          console.log(this.menuitems);
          this.menuitems.changes.subscribe(() => {
            this.modifyLogoutLink(k, this.content[k]);
          });
        }
      }
    }
  }


  modifyLogoutLink(i, ct) {
    const link = this.menuitems.toArray()[i].nativeElement;
    // this.renderer.setAttribute(link, 'href', 'javascript:void(0)');
    // this.renderer.removeAttribute(link, 'ng-reflect-router-link');
    this.renderer.setProperty(link, 'innerHTML', '<a href="javascript:void(0)" class="nav-link">' + ct.pageName  + '</a>');
    this.renderer.listen(link, 'click', () => {
      this.custLogout();
    });
  }

  custLogout() {
    this.authService.logout();
  }


}
