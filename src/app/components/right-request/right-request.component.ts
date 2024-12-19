import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from 'src/app/types/dataType';
import { Router } from '@angular/router'; // Import Router if you need to navigate

import { CartService } from 'src/app/services/cart.service';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-right-request',
  templateUrl: './right-request.component.html',
  styleUrls: ['./right-request.component.css'],
})
export class RightRequestComponent implements OnInit, OnChanges {
  @Input() cartEmpty: boolean = false;  // To check if cart is empty
  @Input() CartItems: CartItem[] = [];  // Input for cart items

  date = new Date();
  applyForm: FormGroup;
  error: string = '';

  totalPrice: number = 0;  // Total price
  totalPoints: number = 0; // Total points

  constructor(
    private cart: CartService, private router: Router) {}


  ngOnInit(): void {
    this.date.setDate(this.date.getDate() + 3);

    this.applyForm = new FormGroup({
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      number: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$'),
      ]),
    });

    // Initial calculation
    this.calculateTotals();
  }

  // Called when @Input properties change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['CartItems']) {
      this.calculateTotals();
    }
  }

  // Method to calculate total price and points
  calculateTotals() {
    this.totalPrice = 0;
    this.totalPoints = 0;

    this.CartItems.forEach((item) => {
      if (item.product.product_type === 'points') {
        // Subtract points for "points" products
        this.totalPoints -= item.product.point_product * item.totalAmount;
      } else {
        // Add total price for other products
        this.totalPrice += item.product.price_product * item.totalAmount;
        this.totalPoints += item.product.point_product * item.totalAmount; // Add points
      }
    });
  }

  submitOrder(paymentMethod: string): void {
    if (!this.applyForm.valid || this.cartEmpty) {
      this.error = this.applyForm.valid ? 'Cart is empty' : 'Form is invalid';
      return;
    }

    const order1 = {
      cart: this.cart.getCart(),
      paymentMethod,
      totalPrice: this.totalPrice,
      totalPoints: this.totalPoints,
      ...this.applyForm.value,
    };

    this.cart.submitOrder(order1).subscribe({
      next: (response) => {

        this.cart.removeCart();
        this.router.navigate(['/order/completed']);



        this.applyForm.reset();
        this.error = '';
      },
      error: (err) => {
        console.error('Submission failed:', err.message);
        this.error = err.message;
      }
    });
  }


  paymentSubmitHandler() {


    this.submitOrder('Instant');
  }
}
