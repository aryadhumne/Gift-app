import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<{ fullName: string; email: string } | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: { fullName: string; email: string }) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
  }
}
