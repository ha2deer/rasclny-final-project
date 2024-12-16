import {Component, OnInit} from '@angular/core';
import {PointCartService} from "../../services/point-cart.service";
import {products} from "../../types/dataType";
import {CartService} from "../../services/cart.service";
import {RouteTrackerService} from "../../services/route-tracker.service";

@Component({
  selector: 'app-product-caard',
  templateUrl: './product-caard.component.html',
  styleUrls: ['./product-caard.component.css']
})
export class ProductCAardComponent implements OnInit {
  products: any[] = []; // Array to hold all products
  loading: boolean = true; // To show a loading indicator
  productType: string = '';

  constructor(private pointCartService: PointCartService, private cart: CartService, private routeTracker: RouteTrackerService) {}

  ngOnInit(): void {
    this.loadProducts();
    const previousUrl = this.routeTracker.getPreviousUrl();
    if (previousUrl?.includes('ponintreq')) {
      this.productType = 'points';
    } else if (previousUrl?.includes('category')) {
      this.productType = 'category';
    }
  }

  loadProducts(): void {
    this.pointCartService.getData().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      },
    });
  }
  onRequestProduct(event: MouseEvent, product: products): void {
    event.stopPropagation()
    this.cart.addToCart(product, 'points');
    console.log('Product:', product);
    console.log('Product Type:', 'points');
  }
}
