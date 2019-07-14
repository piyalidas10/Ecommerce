import { Injectable } from '@angular/core';
// import { Demo1Component } from './demo1/demo1.component';
// import { Demo2Component } from './demo2/demo2.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {

  constructor() { }

  getComponent(componentName: string) {
    if (componentName === 'Demo2Component') {
      // return Demo2Component;
    } else if (componentName === 'Demo1Component') {
      // return Demo1Component;
    }  else {
      return '';
    }
  }
}
