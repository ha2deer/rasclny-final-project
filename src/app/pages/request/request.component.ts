import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/types/dataType';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  CartItems: CartItem[] = [];

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.state$.subscribe(data => {
      this.CartItems = Array.from(data.values());
    });
  }
}
