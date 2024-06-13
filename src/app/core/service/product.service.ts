import { Injectable } from '@angular/core';
import { InforProduct } from '../model/Product/infor-product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private urlListProduct = "http://127.0.0.1:8000/api/category/3"
  private apiUrl1 = 'http://127.0.0.1:8000/api';
  private apiUrl = 'http://127.0.0.1:8000/api/admin'
  private baseImageUrl = 'http://127.0.0.1:8000/'

  constructor(
    private http: HttpClient
  ) {}

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('loginToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getFullImageUrl(imagePath: string): string {
    return `${this.baseImageUrl}${imagePath}`;
  }

  // USER
  getBrands(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl1}/category/3/brands`);
  }

  getListProductLaptop(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/category/3`);
  }

  getMice(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/category/2`);
  }

  getBanPhim(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/category/4`);
  }

  getLotChuot(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/category/1`);
  }

  userGetProductById(id: number): Observable<InforProduct> {
    return this.http.get<InforProduct>(`http://127.0.0.1:8000/api/product/show/${id}`);
  }


  //ADMIN
  getAllProducts(): Observable<InforProduct[]> {
    return this.http.get<InforProduct[]>(`${this.apiUrl}/product`, { headers: this.getAuthHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  searchProducts(keyword: string): Observable<InforProduct[]> {
    return this.http.get<InforProduct[]>(`${this.apiUrl}/product/search/${keyword}`, { headers: this.getAuthHeaders() });
  }

  getProductById(id: number): Observable<InforProduct> {
    return this.http.get<InforProduct>(`http://127.0.0.1:8000/api/product/show/${id}`, { headers: this.getAuthHeaders() });
  }
  
}
    