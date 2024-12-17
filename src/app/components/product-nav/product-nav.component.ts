import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-nav',
  templateUrl: './product-nav.component.html',
  styleUrls: ['./product-nav.component.css'],
})
export class ProductNavComponent implements OnInit {
  data?: any;
  url: any;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getCategories().subscribe(response => {
      this.data = response;
    });
  }
}
