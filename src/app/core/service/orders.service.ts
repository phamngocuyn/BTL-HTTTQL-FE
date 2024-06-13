import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServices {

  private apiUrl = 'http://127.0.0.1:8000/api/admin/order'

  constructor(
    private http: HttpClient
  ) { }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('loginToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
  
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, { status }, { headers: this.getAuthHeaders() });
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/show/${id}`, { headers: this.getAuthHeaders() });
  }

  searchOrders(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/${keyword}`, { headers: this.getAuthHeaders() });
  }
  
} 
  