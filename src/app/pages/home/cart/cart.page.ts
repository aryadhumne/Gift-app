import { DecimalPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, IonicModule} from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonItem, IonLabel, IonButton, IonIcon, IonCard, IonImg, IonThumbnail, IonText,
  IonCol, IonRow, IonListHeader, IonList, IonItemGroup, IonFooter, IonItemDivider,IonModal
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { CouponsComponent } from './components/coupons/coupons.component';
import { Strings } from 'src/app/enum/strings.enum';
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
  IonThumbnail, DecimalPipe, CouponsComponent, AddAddressComponent, AddressesComponent
],

  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CartPage implements OnInit, OnDestroy {
  @ViewChild('add_address_modal') add_address_modal!: IonModal;
  @ViewChild('address_modal') address_modal!: IonModal;

  previous!: string;
  cartSub!: Subscription;
  selectedCoupon!: any;
  applyCoupon = false;
  isAddAddress = false;
  isSelectAddress = false;
  isCheckoutToShippingAddress = false;
  address!: any;
  model: any = null;
  currency = Strings.CURRENCY;
  addresses: any[] = [];
  addressSub!: Subscription;

  private router = inject(Router);
  public cartService = inject(CartService);
  private addressService = inject(AddressService);

  constructor(
    private toastCtrl: ToastController,
    private userService: UserService   // ✅ Inject UserService
  ) {}

  ngOnInit() {
    this.checkUrl();

    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        this.model = cart;
      },
    });

    this.getAddresses();

    this.addressSub = this.addressService.addresses.subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
    });
  }

  async getAddresses() {
    try {
      const addresses: any[] = await this.addressService.getAddresses();
      if (addresses?.length > 0) {
        this.address = addresses.find((address) => address.primary);
      }
    } catch (e) {
      console.log(e);
    }
  }

  checkUrl() {
    const route_url = this.router.url;
    const urlParts = route_url.split('/');
    urlParts.pop();
    this.previous = urlParts.join('/');
  }

  addQuantity(item: any) {
    this.cartService.addQuantity(item);
  }

  subtractQuantity(item: any) {
    this.cartService.subtractQuantity(item);
  }

  closeCouponModal(coupon: any, couponModal: IonModal) {
    if (coupon) {
      this.selectedCoupon = coupon;
      this.model.grandTotal -= this.selectedCoupon?.saved;
    }
    couponModal.dismiss();
  }

  removeCoupon() {
    this.model.grandTotal += this.selectedCoupon?.saved;
    this.selectedCoupon = null;
  }

  closeAddAddressModal(data: any) {
    this.add_address_modal.dismiss();
    if (data) {
      this.address = data;
      if (this.isCheckoutToShippingAddress) {
        this.isCheckoutToShippingAddress = false;
        this.navigateToPayout();
      }
    }
  }

  closeAddressModal(data: any) {
    this.address_modal.dismiss();
    if (data) {
      if (data == 1) {
        this.isAddAddress = true;
      } else {
        this.address = data;
      }
    }
  }

  // ✅ MAIN BUY NOW LOGIC
BuyNow() {
  if (!this.address) {
    this.isAddAddress = true;
    this.isCheckoutToShippingAddress = true;
    return;
  }

  // ✅ Use a single subscription to user$
  const user = this.userService.userValue; // assume you have a getter in UserService returning latest user

  if (!user || !user.customer_id) {
    alert('⚠️ Please login first!');
    return;
  }

  // Prepare order data
  const orderData = {
    customer_id: user.customer_id,
    total_amount: this.model.grandTotal,   // total of cart
    items: this.model.items.map((item: any) => ({
      product_name: item.name,
      quantity: item.quantity,
      price: item.price
    }))
  };

  // Call backend API once
  this.userService.placeOrder(orderData).subscribe({
    next: (res: any) => {
      console.log('✅ Order placed:', res);

      // ✅ Green toast exactly as before
      this.toastCtrl.create({
        message: 'Your order has been placed successfully.',
        duration: 3000,
        color: 'success'
      }).then(toast => toast.present());

      // Clear cart after purchase
      this.cartService.clearCart();
    },
    error: (err) => {
      console.error('❌ Failed to place order:', err);
      alert('Failed to place order. Try again.');
    }
  });
}



  navigateToPayout() {}

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
    if (this.addressSub) this.addressSub.unsubscribe();
  }

 async placeOrder() {
  // ✅ Get logged-in customer synchronously
  const user = this.userService.userValue;

  if (!user?.customer_id) {
    console.error('⚠️ No logged-in customer found');
    alert('⚠️ Please login first!');
    return;
  }

  const orderData = {
    customer_id: user.customer_id,
    total_amount: this.model.grandTotal,
    items: this.model.items.map((item: any) => ({
      product_name: item.name,
      quantity: item.quantity,
      price: item.price
    }))
  };

  // Call backend API once
  this.userService.placeOrder(orderData).subscribe({
    next: (res: any) => {
      console.log('✅ Order placed:', res);

      // ✅ Green success toast
      this.toastCtrl.create({
        message: 'Your order has been placed successfully.',
        duration: 3000,
        color: 'success'
      }).then(toast => toast.present());

      // Clear cart after purchase
      this.cartService.clearCart();
    },
    error: (err) => {
      console.error('❌ Failed to place order:', err);
      alert('Failed to place order. Try again.');
    }
  });
}
}


