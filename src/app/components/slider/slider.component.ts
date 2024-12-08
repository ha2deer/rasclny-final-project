import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  data: any[] = []; // Initialize data as an empty array
  isLoading = true; // Track loading state

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchSliderData();
  }

  /**
   * Fetch data for the slider from the API.
   */
  private fetchSliderData(): void {
    this.apiService.getCategories().subscribe(
      (response) => {
        this.data = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching slider data:', error);
        this.isLoading = false; // Handle errors gracefully
      }
    );
  }
}
