import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private cart: any[] = [];
  
  constructor() { }
  
  addToCart(product: any) {
    this.cart.push(product); 
    
  }
  getCartItems() {
    return this.cart;
  }
}
