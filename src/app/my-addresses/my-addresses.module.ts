import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyAddressesPage } from './my-addresses.page';


@NgModule({
  imports: [
    CommonModule,      // <-- needed for *ngFor, *ngIf
    FormsModule,
    IonicModule,
    MyAddressesPage

  ],

})
export class MyAddressesPageModule {}
