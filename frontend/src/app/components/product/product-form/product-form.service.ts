import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip } from 'rxjs';
import { Product } from '../product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  
  form: BehaviorSubject<Product> = new BehaviorSubject<Product>({name:"", price:0});
  product: BehaviorSubject<Product> = new BehaviorSubject<Product>({name:"", price:0});
  formPropertyToggle: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {
  }

  // Form will update form data
  onFormUpdate(product: Product): void {    
    this.form.next(product);
  }

  // Product Handler will update product
  onProductUpdate(product: Product): void {
    this.product.next(product);
  }

  //Product Handler will update the form properties state
  onFormPropertyToggle(property: string){
    this.formPropertyToggle.next(property);
  }

  // Product Handler will react to form changes
  getForm(): Observable<Product> {
    return this.form.asObservable().pipe(skip(1));
  }

  // Form will react to Product changes
  getProduct(): Observable<Product> {
    return this.product.asObservable().pipe(skip(1));
  }

  // Form will react to property state changes
  getFormPropertyToggle(): Observable<string> {
    return this.formPropertyToggle.asObservable().pipe(skip(1));
  }
  
}
