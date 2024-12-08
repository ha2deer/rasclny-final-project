import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  data: any[] = [];
  isLoading = true; // Track loading state

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  /**
   * Fetch categories data from the API.
   */
  private fetchCategories(): void {
    this.apiService.getCategories().subscribe(
      (response) => {
        this.data = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.isLoading = false; // Handle error gracefully
      }
    );
  }

  /**
   * Constructs the full image path for a given image URL.
   * @param imageUrl The image URL returned by the API.
   * @returns The full path to the image or a default placeholder if the URL is invalid.
   */
  getImagePath(imageUrl: string): string {
    return imageUrl
      ? `assets/${imageUrl}`
      : 'assets/images/default.jpg';
  }
}

