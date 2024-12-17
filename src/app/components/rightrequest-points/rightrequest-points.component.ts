import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-rightrequest-points',
  templateUrl: './rightrequest-points.component.html',
  styleUrls: ['./rightrequest-points.component.css']
})
export class RightrequestPointsComponent {
  date = new Date();
  applyForm: FormGroup;
  error: string = '';

  constructor(private cart: CartService) {}
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
      ]),
    });
  }

  SubmitHandler(paymentMethod: string) {
    if (!this.applyForm.valid || isNaN(this.applyForm.get('number')?.value)) {
      this.error = 'Form is invalid';
      return;
    }
    if (this.cart.getState().length === 0) {
      this.error = 'Cart is empty';
      return;
    }

    const cart = this.cart.removeCart();

    const order = {
      cart,
      paymentMethod,
      ...this.applyForm.value,
    };
    console.log(order);

    const ordersStr = localStorage.getItem('orders') || JSON.stringify([]);
    const orders = JSON.parse(ordersStr);

    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    this.applyForm.reset();
    this.error = '';
  }

  paymentSubmitHandler() {
    this.SubmitHandler('Instant');
  }

  donateSubmitHandler() {
    this.SubmitHandler('Donate');
  }
}
