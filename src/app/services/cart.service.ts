import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, products } from '../types/dataType';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _state: BehaviorSubject<Map<string, CartItem>> = new BehaviorSubject<Map<string, CartItem>>(new Map());
  public readonly state$: Observable<Map<string, CartItem>> = this._state.asObservable();

  /**
   * Get the total count of items in the cart
   * @returns {number} Total count of all items in the cart
   */
  public getCartCount(): number {
    const cart = this._state.getValue();
    return Array.from(cart.values()).reduce((total, item) => total + item.totalAmount, 0);
  }

  /**
   * Add a product to the cart
   * @param {products} product - The product object
   * @param {string} product_type - The type of the product
   */
  public addToCart(product: products, product_type: string): void {
    const currentCart = this._state.getValue();
    const updatedCart = new Map(currentCart);
    const productKey = product.product_id.toString();
    const item = updatedCart.get(productKey); // Use product_id as a string key

    if (item) {
      updatedCart.set(productKey, {
        product,
        totalAmount: item.totalAmount + 1,
        product_type: product_type // Update the product type
      });
    } else {
      updatedCart.set(productKey, { 
        product, 
        totalAmount: 1, 
        product_type: product_type // Set the product type for new item 
      });
    }

    this.updateLocalStorageAndState(updatedCart);
  }

  /**
   * Remove a product from the cart
   * @param {products} product - The product object
   */
  public removeFromCart(product: products): void {
    const currentCart = this._state.getValue();
    const updatedCart = new Map(currentCart);

    const productKey = product.product_id.toString();
    updatedCart.delete(productKey); // Use product_id as a string key

    this.updateLocalStorageAndState(updatedCart);
  }

  /**
   * Increase the quantity of a product in the cart
   * @param {products} product - The product object
   */
  public increaseItem(product: products): void {
    const currentCart = this._state.getValue();
    const updatedCart = new Map(currentCart);

    const productKey = product.product_id.toString();
    const item = updatedCart.get(productKey); // Use product_id as a string key

    if (item) {
      updatedCart.set(productKey, {
        product,
        totalAmount: item.totalAmount + 1,
        product_type: item.product_type // Keep the current product type
      });

      this.updateLocalStorageAndState(updatedCart);
    }
  }

  /**
   * Decrease the quantity of a product in the cart
   * @param {products} product - The product object
   */
  public decreaseItem(product: products): void {
    const currentCart = this._state.getValue();
    const updatedCart = new Map(currentCart);

    const productKey = product.product_id.toString();
    const item = updatedCart.get(productKey); // Use product_id as a string key

    if (!item) return;

    if (item.totalAmount === 1) {
      this.removeFromCart(product); // Remove if amount is 1
      return;
    }

    updatedCart.set(productKey, {
      product,
      totalAmount: item.totalAmount - 1,
      product_type: item.product_type // Keep the current product type
    });

    this.updateLocalStorageAndState(updatedCart);
  }

  /**
   * Set the initial state of the cart from localStorage
   */
  public setState(): void {
    const localStorageCart = localStorage.getItem('cart');
    if (localStorageCart) {
      const cart = JSON.parse(localStorageCart);
      const cartMap = new Map(Object.entries(cart)) as Map<string, CartItem>;
      this._state.next(cartMap);
    }
  }

  /**
   * Get all cart items as an array
   * @returns {CartItem[]} An array of all items in the cart
   */
  public getState(): CartItem[] {
    return Array.from(this._state.getValue().values());
  }

  /**
   * Remove all items from the cart
   * @returns {CartItem[]} An array of items that were in the cart before clearing
   */
  public removeCart(): CartItem[] {
    const currentCart = this._state.getValue().values();
    this._state.next(new Map());
    localStorage.removeItem('cart');
    return Array.from(currentCart);
  }

  /**
   * Update localStorage and the observable state
   * @param {Map<string, CartItem>} updatedCart - The updated cart map
   */
  private updateLocalStorageAndState(updatedCart: Map<string, CartItem>): void {
    const cartObj = Object.fromEntries(updatedCart.entries());
    localStorage.setItem('cart', JSON.stringify(cartObj));
    this._state.next(updatedCart);
  }
}
