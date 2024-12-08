import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly BASE_URL = 'https://recycle.kero-dev.tech/api'; // Base URL for the API

  constructor(private http: HttpClient) {}

  /**
   * Fetches data from the categories endpoint.
   * @returns {Observable<any>} An observable containing the response data.
   */
  getCategories(): Observable<any> {
    const endpoint = `${this.BASE_URL}/categories/index`;
    return this.http.get<any>(endpoint);
  }
}
