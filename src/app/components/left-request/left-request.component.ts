import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem, products } from 'src/app/types/dataType';
@Component({
  selector: 'app-left-request',
  templateUrl: './left-request.component.html',
  styleUrls: ['./left-request.component.css'],
})
export class LeftRequestComponent {
  RemovedProduct: any[] = [];
  @Input() CartItem: CartItem;
  constructor(private cart: CartService) {}

  RemoveItem(event: MouseEvent, product: products) {
    event.stopPropagation();
    this.cart.removeFromCart(product);
  }

  increaseItem(event: MouseEvent, product: products) {
    event.stopPropagation();
  
    this.cart.increaseItem(product);
  }

  decreaseItem(event: MouseEvent, product: products) {
    event.stopPropagation();
    this.cart.decreaseItem(product);
  }
 
  
  
}
