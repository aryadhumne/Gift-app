import { Component } from '@angular/core';
import { IonItem, IonContent, IonToolbar, IonList, IonTitle, IonLabel, IonHeader, IonButtons } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { IonBackButton } from "@ionic/angular/standalone";

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone:true,
  imports: [IonItem, IonContent, IonToolbar, IonList, IonTitle, IonLabel, IonHeader, CommonModule, IonButtons, IonBackButton,FormsModule],

})
export class OrdersPage {
  orders = [
    { id: 1, product: 'Chocolate Box', price: 499, date: '2025-08-01' },
    { id: 2, product: 'Perfume Gift Set', price: 1299, date: '2025-08-15' }
  ];
}
