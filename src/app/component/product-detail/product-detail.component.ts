import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product/product.service';
import { CartService } from '../cart/cart.service'; // Import CartService
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail: any;

  constructor(private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService,
    private router: Router) { } // Thêm Router vào danh sách dependency


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let productId = params['id'];
      this.productService.getProductById(productId).subscribe(product => {
        this.productDetail = product;
      });
    });
  }

  addToCart(product: any) {
    const productToAdd = { ...this.productDetail }; // Tạo một bản sao của sản phẩm để tránh tham chiếu
    this.cartService.addToCart(productToAdd); // Thêm sản phẩm vào giỏ hàng
    this.router.navigate(['/cart']); // Điều hướng đến trang giỏ hàng
  }
  getStarArray(starRating: number): number[] {
    const stars = Math.floor(starRating); // Làm tròn xuống
    const halfStar = starRating - stars >= 0.5; // Kiểm tra nửa sao
    let array = Array(stars).fill(0); // Tạo mảng sao

    // Nếu có nửa sao, thêm một nửa sao vào mảng
    if (halfStar) {
      array.push(0.5);
    }

    return array;
  }
}