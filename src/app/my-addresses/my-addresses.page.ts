import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-addresses',
  standalone: true,
  templateUrl: './my-addresses.page.html',
  styleUrls: ['./my-addresses.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonList, IonItem, IonLabel,CommonModule
  ]
})
export class MyAddressesPage implements OnInit {
  addresses: Array<{ street:string; city:string; state:string; zip:string }> = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadAddresses();
  }
  ionViewWillEnter() {
    this.loadAddresses(); // always refresh from storage
  }

  private loadAddresses() {
    const stored = localStorage.getItem('addresses');
    this.addresses = stored ? JSON.parse(stored) : [];
  }

  // When user taps an address, make it selected and go back to Cart
  selectAddress(address: any) {
    localStorage.setItem('selectedAddress', JSON.stringify(address));
    this.router.navigate(['/cart']);
  }
}
