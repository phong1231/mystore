import { Component, OnInit } from '@angular/core';
import { AddproductService } from './addproduct.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  products: any[] = [];
  editedProduct: any = {};
  newProductForm!: FormGroup; 
  

  constructor(private productService: AddproductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadProducts();
    this.initializeForm(); 
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

 deleteProduct(productId: number): void {
    // Hiển thị cảnh báo xác nhận xóa
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if (!confirmDelete) {
      return; // Không thực hiện xóa nếu người dùng không xác nhận
    }

    // Nếu xác nhận xóa, thực hiện xóa sản phẩm
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(product => product.id !== productId);
      alert('Xóa sản phẩm thành công.');
      console.log('Product deleted successfully.');
    }, error => {
      console.error('Error deleting product:', error);
    });
  }

  editProduct(product: any) {
    this.productService.EditProduct(product.id).subscribe((data) => {
      this.editedProduct = { ...data }; // Copy dữ liệu để tránh thay đổi trực tiếp dữ liệu gốc
    });
  }

  updateProduct() {
    this.productService.UpdateProduct(this.editedProduct.id, this.editedProduct).subscribe(() => {
      this.loadProducts();
      this.editedProduct = {};
      alert('Lưu sản phẩm thành công.');
    });
  }
  initializeForm(): void {
    this.newProductForm = this.fb.group({
      productName: [''],
      productCode: [''],
      description: [''],
      price: [''],
      image: [''] // You can add more form controls if needed
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Lấy tệp đã chọn từ sự kiện change
    if (file) {
      // Đọc dữ liệu hình ảnh và cập nhật đường dẫn hình ảnh vào biểu mẫu
      // (Phương thức này cũng có thể gửi tệp hình ảnh lên server)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageUrl = reader.result as string;
        const imageName = file.name;
        const imagePath = `assets/img/${imageName}`;
 
        // Gửi formData đến server hoặc lưu vào thư mục cần thiết trên server
        this.saveImage(file, imagePath);
 
        // Cập nhật đường dẫn hình ảnh vào trường image trong form
        this.newProductForm.patchValue({ image: imagePath });
 
        // Cập nhật trạng thái và tính hợp lệ của trường image
        this.newProductForm.get('image')?.updateValueAndValidity();
      };
    }
  }
 
  saveImage(file: File, path: string) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const binaryString = event.target.result as string;
      const base64String = btoa(binaryString);
      const imageBlob = this.dataURItoBlob(
        `data:image/jpeg;base64,${base64String}`
      );
      const formData = new FormData();
      formData.append('image', imageBlob, file.name);
      // Gửi formData đến server hoặc lưu vào thư mục cần thiết trên server
    };
    reader.readAsBinaryString(file);
  }
    // Chuyển đổi dữ liệu URI thành Blob
  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  cancelEdit() {
    this.editedProduct = {};
  }
  

  addProduct() {
    // Kiểm tra xem các trường thông tin cần thiết đã được nhập đầy đủ hay chưa
    if (!this.editedProduct.productName || !this.editedProduct.productCode || !this.editedProduct.description || !this.editedProduct.price) {
      alert('Vui lòng nhập đầy đủ thông tin sản phẩm .');
      return;
    }

    // Nếu các trường thông tin đã được nhập đầy đủ, thực hiện thêm sản phẩm
    this.productService.addProduct(this.editedProduct).subscribe(() => {
      this.loadProducts();
      this.editedProduct = {};
      alert('Thêm sản phẩm thành công .');
    });
  }
}
