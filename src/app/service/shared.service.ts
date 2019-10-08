import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  private dataSource = new BehaviorSubject<any>(this.dataDefault);
  productInfo = this.dataSource.asObservable();

  public getErrorKeys(key) {
    const objKey = key.toUpperCase().split(' ').join('_');
    console.log(objKey);
    return this.errorObj[objKey];
  }

}
