import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly BASE_URL = 'https://recycle.kero-dev.tech/api'; 

  constructor(private http: HttpClient) {}

  /**
 
   * @returns {Observable<any>} 
   */
  getCategories(): Observable<any> {
    const endpoint = `${this.BASE_URL}/categories/index`;
    return this.http.get<any>(endpoint);
  }
}
