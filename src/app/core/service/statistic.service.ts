import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private apiUrl = 'http://127.0.0.1:8000/api/admin/statistical';

  constructor(private http: HttpClient) { }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('loginToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
 
  getTotalRevenue(): Observable<{ orders: number, total: number }> {
    return this.http.get<{ orders: number, total: number }>(`${this.apiUrl}/sumOrder`, { headers: this.getAuthHeaders() });
  }

  getTotalQuantitySold(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/sumProduct`, { headers: this.getAuthHeaders() });
  }

  getMonthlyOrders(year: number): Observable<{ month: number, total_orders: number }[]> {
    return this.http.get<{ month: number, total_orders: number }[]>(`${this.apiUrl}/monthlyOrders/${year}`, 
      { headers: this.getAuthHeaders() });
  }

  getMonthlyRevenue(year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/monthlyRevenue/${year}`, { headers: this.getAuthHeaders() });
  }

  getCategoryRevenue(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categoryRevenue`, { headers: this.getAuthHeaders() });
  }

  getMonthlyQuantity(year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/monthlyQuantity/${year}`, { headers: this.getAuthHeaders() });
  }

  getDecisionSupportMonthlyOrders(year: number): Observable<{ max: number, min: number }> {
    return this.http.get<{ max: number, min: number }>(`${this.apiUrl}/decisionSupportMonthlyOrders/${year}`, 
      { headers: this.getAuthHeaders() });
  }

  getDecisionSupportMonthlyRevenue(year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/decisionSupportMonthlyRevenue/${year}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getDecisionSupportCategoryRevenue(year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/decisionSupportMonthlyQuantity/${year}`,
      { headers: this.getAuthHeaders() }
    );
  }

}
