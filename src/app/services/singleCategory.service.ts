import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SingleCategoryService {
  private baseUrl = 'https://recycle.kero-dev.tech/api/categories';

  constructor(private http: HttpClient) {}

  // Fetch products for a single category by ID
  getProductsByCategory(categoryId: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/${categoryId}/products`;
    return this.http.get<any>(apiUrl);
  }

}
