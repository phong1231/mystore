import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
  }
  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.productCode === product.productCode);
    if (existingItem) {
      existingItem.quantity++;
    } else {
     const newItem = { ...product, quantity: 1 };  
      this.cartItems.push(newItem);
    }
  }
  getCartItems() {
    return this.cartItems;
  }
  removeItem(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }
  calculateTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    }); 
    return totalPrice;
  }
  calculateTotalQuantity() {
    let totalQuantity = 0;
    this.cartItems.forEach(item => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }
  clearCart() {
    this.cartItems = [];
  }
 
}
