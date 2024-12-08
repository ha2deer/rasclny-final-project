import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleCategoryService } from '../../services/singleCategory.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  categoryId: string | null = null; // Holds the category ID from the route
  singleCategory: any[] = []; // Stores products in the selected category
  cartProducts: any[] = []; // Stores products added to the cart
  isLoading: boolean = false; // Loading indicator
  errorMessage: string | null = null; // Error message

  constructor(
    private singleCategoryService: SingleCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id'); // Extract category ID from route
      if (this.categoryId) {
        this.loadCategoryData(this.categoryId); // Load products for the category
      } else {
        this.errorMessage = 'Category ID is missing in the route.';
        console.error(this.errorMessage);
      }
    });
  }

  loadCategoryData(categoryId: string): void {
    this.isLoading = true; // Set loading indicator
    this.singleCategoryService.getProductsByCategory(categoryId).subscribe(
      (response: any) => {
        this.isLoading = false; // Clear loading indicator
        console.log('Full response:', response);

        // Assign the fetched data to `singleCategory`
        this.singleCategory = response;
        console.log('Products in category:', this.singleCategory);
      },
      (error) => {
        this.isLoading = false; // Clear loading indicator
        this.errorMessage = 'Error fetching data. Please try again later.';
        console.error(this.errorMessage, error);
      }
    );
  }

  updateCart(newCartProducts: any[]): void {
    this.cartProducts = newCartProducts;
    console.log('Cart updated:', this.cartProducts);
  }

  onButtonClick(event: any, product: any): void {
    console.log('Product clicked:', product);
    // Add the product to the cart
    this.cartProducts.push(product);
    console.log('Cart after adding product:', this.cartProducts);
  }
}
