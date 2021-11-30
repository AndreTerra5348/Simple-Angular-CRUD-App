import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.model';


export interface ProductPaginated{

}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = "http://localhost:3001/products"
  
  public get isEnabled(): boolean {
    return this.status.getValue();
  }

  status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  disable = () => this.status.next(false);
  getStatus = () => this.status.asObservable();

  showMessage(msg: string) : void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
  }

  read(pageIndex: number, pageSize: number, active: string, direction: string): Observable<HttpResponse<Product[]>>{    
    const route = `?_sort=${active}&_order=${direction}&_page=${pageIndex}&_limit=${pageSize}`
    return this.http.get<Product[]>(`${this.baseUrl}${route}`, { observe: 'response' });
  }

  readById(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product)
  }

  delete(id: string): Observable<Product>{
    return this.http.delete<Product>(`${this.baseUrl}/${id}`);
  }
}
