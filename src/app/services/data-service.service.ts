import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productData } from '../types/dataType';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<[productData]>(this.jsonUrl);
  }
}
