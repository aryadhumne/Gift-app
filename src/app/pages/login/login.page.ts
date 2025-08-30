import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  fullName: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    console.log(this.fullName, this.email, this.password); // 👀 Debug log
    if (this.fullName.trim() && this.email.trim() && this.password.trim()) {
      this.router.navigate(['/home']);
    } else {
      alert('Please fill in all fields!');
    }
  }
}
