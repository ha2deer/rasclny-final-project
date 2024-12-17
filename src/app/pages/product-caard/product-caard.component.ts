
import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { PointCartService } from "../../services/point-cart.service";
import { RouteTrackerService } from "../../services/route-tracker.service";
import { ProductPoint, products } from "../../types/dataType";

  @Component({
    selector: 'app-product-caard',
    templateUrl: './product-caard.component.html',
    styleUrls: ['./product-caard.component.css']
  })
  export class ProductCAardComponent implements OnInit {
    products: ProductPoint[] = []; // Array to hold all products
    loading: boolean = true; // Loading state indicator
    productType: string = ''; // Tracks the type of product

    constructor(
      private pointCartService: PointCartService,
      private cart: CartService,
      private routeTracker: RouteTrackerService
    ) { }

    ngOnInit(): void {
      this.loadProducts(); // Load product data on component initialization


      // Determine product type based on the previous route
      const previousUrl = this.routeTracker.getPreviousUrl();
      if (previousUrl?.includes('ponintreq')) {
        this.productType = 'points';
      } else if (previousUrl?.includes('category')) {
        this.productType = 'category';
      }
    }

    loadProducts(): void {
      this.pointCartService.getData().subscribe({
        next: (data: ProductPoint[]) => {
          this.products = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.loading = false;
        },
      });
    }

    onRequestProduct(event: MouseEvent, product: ProductPoint): void {
      // Stop event propagation to avoid unintended side effects
      event.stopPropagation();

      // Log product details
      console.log('Product Details:', product);
      console.log('Product ID:', product.id);
      console.log('Product Type:', this.productType || 'points');

      // Prepare extended product data if needed
      const product_ext: products = {
        product_id: "pointsid_"+product.id,
        product_name: product.name,
        product_type: this.productType || 'points', // Dynamically set product type
        point_product: product.point,
        price_product :product.point,
        image_url: product.image_url,
        QuantityType: "Piece"

      };

      // Add the extended product to the cart
      this.cart.addToCart(product_ext, this.productType || 'points');
    }
  };

