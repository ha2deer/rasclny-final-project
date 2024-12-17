import { Component, Input, OnInit } from '@angular/core';
import { products } from 'src/app/types/dataType';
import { CartService } from '../../../services/cart.service';
import {RouteTrackerService} from "../../../services/route-tracker.service";
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() singleCategory?: any;
  productType: string = ''; // Tracks the type of product

  constructor(private cart: CartService, private routeTracker: RouteTrackerService
  ) {}
  ngOnInit(): void {
    const previousUrl = this.routeTracker.getPreviousUrl();
    if (previousUrl?.includes('ponintreq')) {
      this.productType = 'points';
    } else if (previousUrl?.includes('category')) {
      this.productType = 'category';
    }
  }
  onButtonClick(event: MouseEvent, product: products): void {
    event.stopPropagation()
    this.cart.addToCart(product,"category");
    console.log(product);
    console.log(this.productType);
  }
}
