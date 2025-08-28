import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,   // ✅ Standalone component
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  fullName: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.fullName && this.email && this.password) {
      this.router.navigate(['/home']);   // ✅ redirect to home
    } else {
      alert('Please fill in all fields!');
    }
  }


  }

