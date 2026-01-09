import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}
  getProfile(): Observable<any> {
    return this._http
      .get<any>(`${environment.baseUrl}auth/me`)
      .pipe(map((res) => res));
  }
  getProductList(query: string): Observable<any> {
    return this._http
      .get<any>(`${environment.baseUrl}products?${query}`)
      .pipe(map((res) => res));
  }
  getUserList(query: string): Observable<any> {
    return this._http
      .get<any>(`${environment.baseUrl}users?${query}`)
      .pipe(map((res) => res));
  }
  loginUser(body: any): Observable<any> {
    return this._http
      .post<any>(`${environment.baseUrl}auth/login`, body)
      .pipe(map((res) => res));
  }
}
