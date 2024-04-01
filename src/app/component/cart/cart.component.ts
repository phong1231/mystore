import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeItem(item: any) {
    this.cartService.removeItem(item);
    this.updateTotalPrice();
  }

  // Tăng số lượng của sản phẩm trong giỏ hàng
  increaseQuantity(item: any) {
    item.quantity++; // Tăng số lượng của sản phẩm trực tiếp
    this.updateTotalPrice();
  }

  // Giảm số lượng của sản phẩm trong giỏ hàng
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--; // Giảm số lượng của sản phẩm nếu lớn hơn 1
      this.updateTotalPrice();
    }
  }

  // Cập nhật lại giỏ hàng sau khi thay đổi số lượng
  updateCart() {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  // Tính tổng giá tiền của tất cả các mặt hàng trong giỏ hàng
  updateTotalPrice() {
    this.totalPrice = this.cartService.calculateTotalPrice();
  }

  // Thanh toán
 // Thanh toán
checkout() {
  if (this.cartItems.length === 0) {
    alert('Bạn chưa có sản phẩm trong giỏ hàng!');
  } else {
    // Ở đây bạn có thể thực hiện các thao tác cần thiết cho quá trình thanh toán,
    // ví dụ: gửi đơn hàng đến máy chủ, cập nhật cơ sở dữ liệu, vv.
    // Sau khi thanh toán thành công, xóa tất cả các mục khỏi giỏ hàng
    this.cartService.clearCart();
    // Cập nhật lại danh sách giỏ hàng và tổng giá tiền trong giao diện người dùng
    this.cartItems = [];
    this.totalPrice = 0;
    // Hiển thị thông báo thanh toán thành công cho người dùng
    alert('Thanh toán thành công!');
  }
}

}
