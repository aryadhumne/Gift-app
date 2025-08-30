import { Component } from '@angular/core';
import { IonContent, IonToolbar, IonHeader, IonTitle, IonButtons } from "@ionic/angular/standalone";
import { IonBackButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
  standalone:true,
  imports: [IonContent, IonToolbar, IonHeader, IonTitle, IonButtons, IonBackButton],

})
export class AboutUsPage {}
