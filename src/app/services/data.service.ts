import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { Observable } from 'rxjs';

import Products from '../data/products.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getProducts(): Observable<ProductModel[]> {
    
    //can be replaced with real call
    return new Observable((observer) => {
      setTimeout(() => observer.next(Products));
    });

  }


  public submit(): Observable<any> {
    
    return new Observable((observer) => {
      setTimeout(() => observer.next(), 1000);
    });

  }


}
