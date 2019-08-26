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
  selectedOpt: string;
  @Output() chooseSubcat = new EventEmitter<any>();

  constructor(
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subCategories();
  }

  subCategories() {
      this.route.params.subscribe(params => {
        const cat = params['cat'];
        this.apiService.getCategories().
          then(
            data => {
              const category = data['categories'].filter((elemt) => elemt.catName === cat);
              this.subCat = category[0].subCat;
              console.log('Sub category =>', this.subCat);
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

  sortBySubcat(event, index) {
    const allElement = event.target.parentElement.querySelectorAll('li');
    this.selectedOpt = event.target.innerText.toLowerCase();
    console.log(allElement);
    allElement.forEach(element => {
      element.classList.remove('active');
    });
    if (!event.target.classList.contains('active')) {
      event.target.classList.add('active');
    } else {
      event.target.classList.remove('active');
    }
    this.chooseSubcat.emit(this.selectedOpt);
  }

}
