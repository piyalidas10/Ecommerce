import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../service/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categories: {};
  selectedCat: string;
  constructor(private productsData: APIService) { }

  ngOnInit() {
    this.listCategories();
  }

  async listCategories() {
    try {
      // "await" will wait for the promise to resolve or reject
      // if it rejects, an error will be thrown, which you can
      // catch with a regular try/catch block
      await this.productsData.getCategories().
        then(
          (res) => {
            this.categories = res;
            console.log(this.categories);
          }
        );
      } catch (error) {
        console.log(error);
      }
  }

}
