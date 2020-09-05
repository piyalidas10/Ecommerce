import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '@ecommerce/service/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecommerce-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  isLoading = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
    .subscribe((data) => {
      this.isLoading = data.show;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
