import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ecommerce-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  isLoading: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
