import { Component, Input, OnInit } from '@angular/core';
import { products } from 'src/app/types/dataType';
import { CartService } from '../../../services/cart.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() singleCategory?: any;
  constructor(private cart: CartService) {}
  ngOnInit(): void {}
  onButtonClick(event: MouseEvent, product: products): void {
    event.stopPropagation()
    this.cart.addToCart(product,"category");
    console.log(product);
  }
}
