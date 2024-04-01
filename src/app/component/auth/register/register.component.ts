import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted: boolean = false; // Thêm biến submitted và khởi tạo giá trị là false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit() {
    this.submitted = true; // Đặt giá trị của submitted là true khi form được submit
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((result) => {
        if (result) {
          console.log('Registration successful!');
          alert('Registration successful!');
          this.router.navigate(['/login']); // Chuyển hướng sau khi đăng ký thành công
        } else {
          console.log('Registration failed!');
          alert('Registration failed!');
        }
      });
    }
  }
}
