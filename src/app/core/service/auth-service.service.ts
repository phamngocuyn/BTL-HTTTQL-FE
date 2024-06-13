import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/Auth/User';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Register } from '../model/Auth/register';


@Injectable({
  providedIn: 'root' 
})
export class AuthServiceService {

  private UrlLogin = "http://127.0.0.1:8000/api/login";
  private UrlRegister = "http://127.0.0.1:8000/api/customer/register";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
 
  onLogin(user: { username: string; password: string }): Observable<any> {
    return this.http.post<{token: string, role: string}>(this.UrlLogin, user).pipe(
      tap((response: any)=> {
        localStorage.setItem('loginToken', response.token);
        localStorage.setItem('userRole', response.role); 
      }),
      catchError(error => {
        return throwError(() => new Error(error.error.message || 'Có lỗi xảy ra từ server'));
      })
    );
  } 

  //Đăng kí 
  onRegister(Register: { username: string; password: string; phone: String; 
                         last_name: String; first_name: String; email: String; password_confirmation: String}): Observable<any> {
    return this.http.post(this.UrlRegister, Register).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error.message || 'Có lỗi xảy ra từ server'));
      })
    );
  }

}
