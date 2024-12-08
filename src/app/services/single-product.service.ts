import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingleProductService {
  constructor(private http: HttpClient) { }
  id:any
  getData(_id: any): Observable<any> {
    return this.http.get<any>(`https://recycle.kero-dev.tech/api/products/index`);
    
  }
}
