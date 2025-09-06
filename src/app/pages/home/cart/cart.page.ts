import { DecimalPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonItem, IonLabel, IonButton, IonIcon, IonCard, IonImg, IonThumbnail, IonText,
  IonCol, IonRow, IonListHeader, IonList, IonItemGroup, IonFooter, IonItemDivider,IonModal
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { AddressService } from 'src/app/services/address/address.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    IonItemDivider, IonModal, IonFooter, IonItemGroup, IonList, IonListHeader,
    IonRow, IonCol, IonText, IonImg, IonCard, IonIcon, IonButton, IonLabel,
    IonItem, IonBackButton, IonButtons, IonContent, IonTitle, IonToolbar,
    IonThumbnail, DecimalPipe, AddAddressComponent, AddressesComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CartPage implements OnInit, OnDestroy {
  @ViewChild('add_address_modal') add_address_modal!: IonModal;
  @ViewChild('address_modal') address_modal!: IonModal;

  // ---------------- MODAL FLAGS ----------------
  isAddAddress: boolean = false;
  isSelectAddress: boolean = false;

  previous: string = '/';
  cartSub!: Subscription;
  addressSub!: Subscription;
  address!: any;
  addresses: any[] = [];
  model: any = null;

  applyCoupon: boolean = false;
  selectedCoupon: any = null;
  currency: string = '$'; // or Strings.CURRENCY

  private router = inject(Router);
  public cartService = inject(CartService);
  private addressService = inject(AddressService);

  constructor(
    private toastCtrl: ToastController,
    private userService: UserService
  ) {}

  // ...rest of your code



  ngOnInit() {
    // compute previous URL for back button
    const route_url = this.router.url;
    const urlParts = route_url.split('/');
    urlParts.pop();
    this.previous = urlParts.join('/') || '/';

    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => this.model = cart
    });

    this.getAddresses();

    this.addressSub = this.addressService.addresses.subscribe({
      next: (addresses: any[]) => this.address = addresses.find((a: any) => a.primary)
    });
  }

  async getAddresses() {
    try {
      const addresses: any[] = await this.addressService.getAddresses();
      if (addresses?.length > 0) {
        this.addresses = addresses;
        this.address = addresses.find((a: any) => a.primary);
      }
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy() {
    if (this.cartSub) this.cartSub.unsubscribe();
    if (this.addressSub) this.addressSub.unsubscribe();
  }
  // ----------------- CART QUANTITY -----------------
addQuantity(item: any) {
  this.cartService.addQuantity(item);
}

subtractQuantity(item: any) {
  this.cartService.subtractQuantity(item);
}


  // -------------------- BUY NOW --------------------
  BuyNow() {
    if (!this.address) {
      alert('⚠️ Please select a shipping address first!');
      return;
    }

    const user = this.userService.userValue;
    if (!user?.customer_id) {
      alert('⚠️ Please login first!');
      return;
    }

    const items = this.model.items.map((item: any) => ({
      product_id: item.id, // must match backend product_id
      quantity: item.quantity,
      price: item.price
    }));

    this.userService.placeOrder(user.customer_id, items, this.model.grandTotal).subscribe({
      next: async (res: any) => {
        console.log('✅ Order placed:', res);
        const toast = await this.toastCtrl.create({
          message: 'Your order has been placed successfully.',
          duration: 3000,
          color: 'success'
        });
        toast.present();
        this.cartService.clearCart();
      },
      error: (err) => {
        console.error('❌ Failed to place order:', err);
        alert('Failed to place order. Try again.');
      }
    });
  }

  // -------------------- TEMPLATE MODAL METHODS --------------------
  closeAddAddressModal(data: any) {
    this.add_address_modal.dismiss();
    if (data) this.address = data;
  }

  closeAddressModal(data: any) {
    this.address_modal.dismiss();
    if (data) this.address = data;
  }

  // -------------------- COUPON METHODS --------------------
  closeCouponModal(coupon: any, couponModal: IonModal) {
    if (coupon) {
      this.selectedCoupon = coupon;
      this.model.grandTotal -= this.selectedCoupon?.saved;
    }
    couponModal.dismiss();
  }

  removeCoupon() {
    if (this.selectedCoupon) {
      this.model.grandTotal += this.selectedCoupon?.saved;
      this.selectedCoupon = null;
    }
  }

  // -------------------- PLACE ORDER BUTTON --------------------
  placeOrder() {
    this.BuyNow();
  }
}
