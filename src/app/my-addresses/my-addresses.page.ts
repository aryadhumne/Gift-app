import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonList, IonItem, IonLabel, IonButton, IonItemSliding,
  IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-addresses',
  standalone: true,
  templateUrl: './my-addresses.page.html',
  styleUrls: ['./my-addresses.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonList, IonItem, IonLabel, IonButton,
    IonItemSliding, IonItemOptions, IonItemOption, CommonModule
  ]
})
export class MyAddressesPage {
  addresses: Array<{ type: string; details: string }> = [
    { type: 'Home', details: 'Bno.33 Svedi Naka near iskon temple,Ahmednagar,India' },
    { type: 'Work', details: 'Floor no.6 MIDC near renuka mata mandir,Ahmednagar,India' },
    { type: 'Others', details: 'Bno 4 Bhingar Near Statebank Ahmednagar,India' }
  ];

  constructor(private router: Router, private alertCtrl: AlertController) {}

  // select an address (for example in cart)
  selectAddress(address: any) {
    localStorage.setItem('selectedAddress', JSON.stringify(address));
    this.router.navigate(['/cart']);
  }

  // edit an address using Ionic Alert
  async editAddress(index: number) {
    const addr = this.addresses[index];
    const alert = await this.alertCtrl.create({
      header: `Edit ${addr.type} Address`,
      inputs: [
        {
          name: 'details',
          type: 'text',
          value: addr.details,
          placeholder: 'Enter address'
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            this.addresses[index].details = data.details;
          }
        }
      ]
    });
    await alert.present();
  }
}
