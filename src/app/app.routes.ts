import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/home/cart/cart.page').then( m => m.CartPage)
      },
      {
        path: 'gifts/:id',
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/home/item-detail/item-detail.page').then( m => m.ItemDetailPage)
          },
          {
            path: 'cart',
            loadComponent: () => import('./pages/home/cart/cart.page').then( m => m.CartPage)
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.page').then( m => m.OrdersPage)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./about-us/about-us.page').then( m => m.AboutUsPage)
  },
  {
    path: 'my-addresses',
    loadComponent: () => import('./my-addresses/my-addresses.page').then( m => m.MyAddressesPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
];
