import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{6}$/) // 👈 must be exactly 6 digits
      ]),
    });
  }
Clogin() {
  if (this.loginForm.valid) {
    const { fullName, email } = this.loginForm.value;

    // ✅ push user data into BehaviorSubject
    this.userService.setUser({ fullName, email });

    this.router.navigate(['/home']);
  } else {
    alert('Please fill in all fields correctly!');
  }
}

}
