import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeData } from '../model/Employees/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://127.0.0.1:8000/api/admin'

  constructor(
    private http: HttpClient
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('loginToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
 
  getAllEmployee(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/employee`, { headers });
  }

  getDetailEmployee(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/employee/show/${id}`, { headers });
  }

  deleteEmployee(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/employee/delete/${id}`, { headers });
  }

  addEmployee(employeeData: EmployeeData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/employee/register`, employeeData, { headers });
  }

  updateEmployee(id: number, employeeData: EmployeeData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/employee/update${id}`, employeeData, { headers });
  }

  getEmployeeById(id: number): Observable<EmployeeData> {
    const headers = this.getAuthHeaders();
    return this.http.get<EmployeeData>(`${this.apiUrl}/employee/${id}`, { headers });
  }

  searchEmployees(keyword: string): Observable<EmployeeData[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<EmployeeData[]>(`${this.apiUrl}/employee/search/${keyword}`, { headers });
  }

}
 