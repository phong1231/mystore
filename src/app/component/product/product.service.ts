import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator
import { CartService } from '../cart/cart.service'; // Import CartService

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'http://localhost:3000/product'; // Endpoint for products

  constructor(private http: HttpClient, private cartService: CartService) {}

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${productId}`);
  }
  // Lấy danh sách sản phẩm
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }

  // Tìm kiếm sản phẩm theo tên
  searchProductByName(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      map((products: any[]) => { // Specify type for products
        // Lọc các sản phẩm có tên bắt đầu bằng từ khóa
        return products.filter(product => product.productName.toLowerCase().startsWith(keyword.toLowerCase()));
      })
    );
  }

  // Thêm sản phẩm vào giỏ hàng từ trang tìm kiếm
  addToCartFromSearch(product: any): void {
    this.cartService.addToCart(product);
  }
  
}
