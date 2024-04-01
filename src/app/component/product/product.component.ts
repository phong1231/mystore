import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  searchedProducts: any[] = [];
  
  constructor(private productService: ProductService, private cartService: CartService, private router: Router) {} // Inject CartService
  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  searchProducts(keyword: string) {
    if (keyword.trim() !== '') {
      this.productService.searchProductByName(keyword).subscribe(
        (products: any[]) => {
          this.searchedProducts = products;
        },
        (error: any) => {
          console.error('Error searching products:', error);
        }
      );
    } else {
      this.searchedProducts = [];
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product); 
    this.router.navigate(['/cart']);
  }
  addToCartFromSearch(product: any) {
    this.addToCart(product);
  }
  
}
