import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{6}$/) // must be exactly 6 digits
      ]),
    });
  }

  Clogin(){
    if (this.loginForm.valid) {
      const { fullName, email } = this.loginForm.value;

      this.http.post<any>('http://localhost:5000/api/customers', {
        full_name: fullName,
        email: email,
        phone: '0000000000'
      }).subscribe({
        next: (customer) => {
          // Save in frontend service
          this.userService.setUser(customer);
          localStorage.setItem('customer_id', customer.customer_id);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Failed to save customer:', err);
          alert('Database error.');
        }
      });
    } else {
      alert('Please fill in all fields correctly!');
    }
  }
}