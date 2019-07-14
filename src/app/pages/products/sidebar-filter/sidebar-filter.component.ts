import { Component, OnInit, EventEmitter } from '@angular/core';
import { APIService } from '../../../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Options } from 'ng5-slider';
import { Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss']
})
export class SidebarFilterComponent implements OnInit {
  subCat = [];
  minValue: Number = 50;
  maxValue: Number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000
  };
  priceSelection: any;
  @Output() priceVal = new EventEmitter();

  constructor(
    private productsData: APIService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subCategories();
  }

  subCategories() {
      this.route.params.subscribe(params => {
        const cat = params['cat'];
        this.productsData.getProducts(cat).
          subscribe(
            data => {
              this.subCat = [];
              data.forEach(element => {
                if (element['Category'] === cat) {
                  this.subCat.push(element['SubCategory']);
                }
              });
              console.log(this.subCat);
            },
            err => {
              console.log(err);
            }
          );
      });
  }

  changePrice() {
    console.log('Price', this.priceSelection);
    this.priceVal.emit(this.priceSelection);
  }

}
