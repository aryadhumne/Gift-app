import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonItem,
  IonAvatar,
  IonLabel,
  IonText,
  IonMenuToggle,
  IonContent, 
  IonIcon, 
  IonList, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  arrowBackOutline,
  bagHandle,
  bagHandleOutline,
  bagHandleSharp,
  documentLockOutline,
  documentLockSharp,
  homeOutline,
  homeSharp,
  informationCircleOutline,
  informationCircleSharp,
  keyOutline,
  keySharp,
  locationOutline,
  locationSharp,
  logOutOutline,
  logOutSharp,
  personOutline,
  personSharp,
  remove,
  star,
  ticketOutline,
  trashOutline,
} from 'ionicons/icons';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonToolbar, 
    IonList, IonIcon, IonContent, IonText, IonLabel, IonAvatar,
    IonItem, IonHeader, IonApp, IonRouterOutlet, IonMenu, IonMenuToggle, 
    NgClass, RouterLink, RouterLinkActive, CommonModule
  ],
})
export class AppComponent implements OnInit {
  pages = [
    { title: 'Home', url: '/home', icon: 'home', active: true },
    { title: 'Orders', url: '/orders', icon: 'bag-handle', active: false },
    { title: 'My-Addresses', url: '/my-addresses', icon: 'location', active: false },
    { title: 'About-Us', url: '/about-us', icon: 'information-circle', active: false },
  ];

  user: any;

  constructor(private router: Router, private userService: UserService) { 
    this.addAllIcons();
  }

  
  ngOnInit() {
    this.userService.user$.subscribe(u => {
      this.user = u;
    });
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }



  addAllIcons() {
    addIcons({
      star, bagHandleOutline, bagHandle, bagHandleSharp,
      trashOutline, add, remove, arrowBackOutline, ticketOutline,
      locationOutline, homeOutline, homeSharp,
      informationCircleOutline, informationCircleSharp,
      documentLockOutline, documentLockSharp,
      logOutOutline, logOutSharp,
      personOutline, personSharp, locationSharp,
      keyOutline, keySharp,
    });
  }

  onItemTap(page: any) {
    if (!page?.active) {
      const index = this.pages.findIndex(x => x.active);
      if (index > -1) this.pages[index].active = false;
      page.active = true;
    }

    if (page?.url) {
      this.router.navigate([page.url]);
    } else {
      this.logout();
    }
  }

  logout() {
    console.log('Logging out...');
    // ✅ clear user info if needed
    this.user = null;
    this.router.navigate(['/login']);
  }
}
