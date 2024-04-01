import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { CartService } from '../cart/cart.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = []; 

  constructor(private productService: ProductService, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products.slice(0, 4); 
    });
  }
  addToCart(product: any) {
    
    this.cartService.addToCart(product); 
    this.router.navigate(['/cart']);
  }
}
