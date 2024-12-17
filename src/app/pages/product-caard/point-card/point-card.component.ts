import { Component, Input } from '@angular/core';
import { products } from 'src/app/types/dataType';
import { CartService } from '../../../services/cart.service';
@Component({
  selector: 'app-point-card',
  templateUrl: './point-card.component.html',
  styleUrls: ['./point-card.component.css']
})
export class PointCardComponent {
  @Input() singleCategory?: any;
  constructor(private cart: CartService) {}
  ngOnInit(): void {}
  onButtonClick(event: MouseEvent, product: products): void {
    event.stopPropagation();
    this.cart.addToCart(product,'points');
    console.log(product.product_type);
  }
}
