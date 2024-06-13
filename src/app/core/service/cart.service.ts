import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('loginToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addToCart(productId: number): Observable<any> {
    const url = `${this.apiUrl}/cart/addToCart/${productId}`;
    return this.http.post<any>(url, null)
      .pipe(
        catchError(error => {
          console.error('Error adding to cart:', error);
          return throwError(error);
        })
      );
  }
}
