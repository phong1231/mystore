import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchKeyword: string = ''; // Khởi tạo biến searchKeyword
  searchedProducts: any[] = [];
  private searchTerms = new Subject<string>();

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((keyword: string) => this.productService.searchProductByName(keyword))
    ).subscribe(products => this.searchedProducts = products);
  }

  onSearchInput(event: any): void {
    this.searchTerms.next(event.target.value);
  }

  addToCart(product: any): void {
    this.productService.addToCartFromSearch(product);
    this.router.navigate(['/cart']);
  }

  search(): void {
    if (this.searchKeyword.trim() !== '') {
      this.productService.searchProductByName(this.searchKeyword).subscribe(
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
}
