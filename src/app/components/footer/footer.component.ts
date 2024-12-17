import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  data?: any;
  url: any;
  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.apiService.getCategories().subscribe(
      (response) => {
      this.data = response;
    });
  }

  navigateTo(cat: any) {
    this.router.navigate(cat);
  }
}
