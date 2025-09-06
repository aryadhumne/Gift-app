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

  // ---------- USER ----------
  setUser(user: { customer_id?: number; fullName: string; email: string }) {
    this.userValue = user;
    this.userSubject.next(user);
  }

  clearUser() {
    this.userValue = null;
    this.userSubject.next(null);
  }

  // ---------- CUSTOMER ----------
  addCustomer(customer: { fullName: string; email: string }) {
    return this.http.post<{ customer_id: number; full_name: string; email: string }>(
      `${this.apiUrl}/customers`,
      customer
    );
  }

  // ---------- ORDER ----------
  placeOrder(
    customer_id: number,
    items: { product_id: number; quantity: number; price: number }[],
    total_amount: number
  ) {
    return this.http.post<{ order_id: number }>(
      `${this.apiUrl}/orders`,
      { customer_id, items, total_amount }
    );
  }
}
