import { Component, OnInit } from '@angular/core';
import { SharedService } from '@ecommerce/service/shared.service';
import { Icategories } from '@ecommerce/interfaces/categories';

@Component({
  selector: 'ecommerce-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categories: {};
  selectedCat: string;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.listCategories();
  }

  async listCategories() {
    try {
      // "await" will wait for the promise to resolve or reject
      // if it rejects, an error will be thrown, which you can
      // catch with a regular try/catch block
      await this.sharedService.categories.
        subscribe(
          (res: Icategories[]) => {
            this.categories = res;
            console.log('categories => ', this.categories);
          }
        );
      } catch (error) {
        console.log(error);
      }
  }

}
