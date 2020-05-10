import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  dataDefault1 = [];
  dataDefault2 = [];
  errorObj = [];
  siteContent = [];

  constructor(private http: HttpClient) { }

  private dataSource1 = new BehaviorSubject<any>(this.dataDefault1);
  content = this.dataSource1.asObservable();
  private dataSource2 = new BehaviorSubject<any>(this.dataDefault2);
  categories = this.dataSource2.asObservable();

  public getErrorKeys(key) {
    const objKey = key.toUpperCase().split(' ').join('_');
    console.log(objKey);
    console.log(this.errorObj[objKey]);
    return this.errorObj[objKey];
  }

  public setSiteContent(content) {
    this.dataSource1.next(content);
  }

  public setCategories(categories) {
    this.dataSource2.next(categories);
  }

}
