import {
  Component, OnInit, OnChanges, ChangeDetectorRef, ChangeDetectionStrategy,
  AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2, ViewEncapsulation
} from '@angular/core';
import { APIService } from '../../../service/api.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isLoggedIn: any;
  userName: string;
  content: {};
  lenMenu: number;
  @ViewChildren('menuitem') private menuitems: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    private productsData: APIService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef) {
    // this.cdr.markForCheck();
  }

  ngOnInit() {
    this.siteContent();
    this.authService.loggedInStatus.subscribe(res => this.isLoggedIn = res);
    console.log(this.authService.loggedInStatus.getValue());
    this.isLoggedIn = true;
  }

  ngAfterViewInit() {

  }

  async siteContent() {
    try {
      // "await" will wait for the promise to resolve or reject
      // if it rejects, an error will be thrown, which you can
      // catch with a regular try/catch block
      await this.productsData.getContent().
        then(
          (res) => {
            if (this.isLoggedIn === false) {
              const pageName = 'logout';
              this.content = res['sitePage'].filter((elemt) => elemt.pageName !== pageName);
            } else {
              this.content = res['sitePage'];
              this.checkIndexLogout();
            }
            console.log('Header Menu => ', this.content);
            this.cdr.markForCheck();
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  /*
    chekc the index of logout menu
  */
  checkIndexLogout() {
    for (const k in this.content) {
      if (this.content.hasOwnProperty(k)) {
        // console.log(this.content[k]);
        if (this.content[k].pageHeader === 'logout') {
          this.menuitems.changes.subscribe(() => {
            this.modifyLogoutLink(k, this.content[k]);
          });
        }
      }
    }
  }


  modifyLogoutLink(i, ct) {
    const link = this.menuitems.toArray()[i].nativeElement;
    console.log(ct);
    // this.renderer.setAttribute(link, 'href', 'javascript:void(0)');
    // this.renderer.removeAttribute(link, 'ng-reflect-router-link');
    this.renderer.setProperty(link, 'innerHTML', '<a href="javascript:void(0)" class="nav-link">' + ct.pageName  + '</a>');
    this.renderer.listen(link, 'click', () => {
      this.useLogout();
    });
  }

  useLogout() {
    this.authService.logout();
  }


}
