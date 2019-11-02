import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  dataDefault = [
    {
      id : 1
    }
  ];
  errorObj = [];
  siteContent = [];

  constructor(private http: HttpClient) { }

  private dataSource = new BehaviorSubject<any>(this.dataDefault);
  content = this.dataSource.asObservable();

  public getErrorKeys(key) {
    const objKey = key.toUpperCase().split(' ').join('_');
    console.log(objKey);
    console.log(this.errorObj[objKey]);
    return this.errorObj[objKey];
  }

  public setSiteContent(content) {
    this.dataSource.next(content);
  }

}
