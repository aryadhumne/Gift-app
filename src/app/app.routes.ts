import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/home/cart/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'gifts/:id',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/home/item-detail/item-detail.page').then(
                (m) => m.ItemDetailPage
              ),
          },
          {
            path: 'cart',
            loadComponent: () =>
              import('./pages/home/cart/cart.page').then((m) => m.CartPage),
          },
        ],
      },
    ],
  },
  // 👇 Global Cart route
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/home/cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.page').then((m) => m.OrdersPage),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./about-us/about-us.page').then((m) => m.AboutUsPage),
  },
  {
    path: 'my-addresses',
    loadComponent: () =>
      import('./my-addresses/my-addresses.page').then(
        (m) => m.MyAddressesPage
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
