import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa khi khởi động ứng dụng
    const token = localStorage.getItem('token');
    if (token) {
      // Nếu có token trong Local Storage, đánh dấu người dùng là đã đăng nhập
      this.isAuthenticatedSubject.next(true);
    }
  }

  register(registerData: { email: string; password: string }): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/user', registerData).pipe(
      map(response => {
        console.log('User added successfully:', response);
        return true;
      }),
      catchError(error => {
        console.error('Registration failed:', error);
        return of(false);
      })
    );
  }

  login(loginData: { email: string; password: string }): Observable<boolean> {
    return this.http.get<any[]>('http://localhost:3000/user').pipe(
      map(users => {
        const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
        if (user) {
          // Lưu token vào Local Storage khi đăng nhập thành công
          localStorage.setItem('token', user.token);
          this.isAuthenticatedSubject.next(true);
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('token'); // Xóa token từ Local Storage
    this.isAuthenticatedSubject.next(false); // Cập nhật trạng thái đăng nhập
    this.router.navigate(['/login']); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:3000/isLoggedIn');
  }
}
