import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonRadioGroup,
  IonList,
  IonItem,
  IonLabel,
  IonRadio,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  standalone: true,
  imports: [
    IonRadio,
    IonLabel,
    IonItem,
    IonList,
    IonRadioGroup,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonHeader,
    IonToolbar,
  ],
})
export class AddressesComponent  {
  @Input() addresses: any[] = [];
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() {}

  

  dismiss(data?: any) {
    this.close.emit(data);
  }
}
