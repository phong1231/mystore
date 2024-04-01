 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddproductService {
  private apiURL = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }

  EditProduct(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${productId}`);
  }

  UpdateProduct(productId: number, frmProduct: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${productId}`, frmProduct);
  }

  deleteProduct(productId: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiURL}/${productId}`);
  }

  // Thêm phương thức để thêm sản phẩm mới
  addProduct(newProduct: any): Observable<any> {
    return this.http.post<any>(this.apiURL, newProduct);
  }
}