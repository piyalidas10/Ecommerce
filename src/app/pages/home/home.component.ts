import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title
  ) {
        this.router.events.pipe(
          filter(event => event instanceof ActivationEnd)
        ).subscribe(event => {
          this.titleService.setTitle(event['snapshot'].data['title']);
        });
  }

  ngOnInit() {

  }

}
