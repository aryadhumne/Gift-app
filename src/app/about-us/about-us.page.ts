import { Component } from '@angular/core';
import { IonContent, IonToolbar, IonHeader, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
  standalone:true,
  imports: [IonContent, IonToolbar, IonHeader, IonTitle],

})
export class AboutUsPage {}
