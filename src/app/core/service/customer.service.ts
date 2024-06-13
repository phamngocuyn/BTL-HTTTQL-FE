import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://127.0.0.1:8000/api/admin/customer'

  constructor(
    private http: HttpClient
  ) { }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('loginToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  searchCustomers(keyword: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/search/${keyword}`, { headers: this.getAuthHeaders() });
  }
}
  