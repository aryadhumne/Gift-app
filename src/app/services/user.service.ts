import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api';

  private userSubject = new BehaviorSubject<{ customer_id?: number; fullName: string; email: string } | null>(null);
  user$ = this.userSubject.asObservable();
  userValue: { customer_id?: number; fullName: string; email: string } | null = null;

  constructor(private http: HttpClient) {}

  setUser(user: { customer_id?: number; fullName: string; email: string }) {
    this.userValue = user;
    this.userSubject.next(user);
  }

  clearUser() {
    this.userValue = null;
    this.userSubject.next(null);
  }

  addCustomer(customer: { fullName: string; email: string }) {
    return this.http.post<{ customer_id: number; fullName: string; email: string }>(
      `${this.apiUrl}/customers`,
      customer
    );
  }

  createOrder(customer_id: number) {
    return this.http.post<{ order_id: number }>(
      `${this.apiUrl}/orders`,
      { customer_id }
    );
  }

  addOrderItem(order_id: number, product: { name: string; quantity: number; price: number }) {
    return this.http.post(
      `${this.apiUrl}/order-items`,
      {
        order_id,
        product_name: product.name,
        quantity: product.quantity,
        price: product.price
      }
    );
  }

  placeOrder(orderData: any) {
    return this.http.post<any>(`${this.apiUrl}/orders`, orderData); // ✅ return observable
  }
}
