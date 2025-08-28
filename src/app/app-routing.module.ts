import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) 
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
 {
    path:'cart',
    loadComponent:()=>import('./pages/home/cart/cart.page').then(m=>m.CartPage)
  },

  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.page').then(m => m.OrdersPage)
  },
  {
    path: 'my-addresses',
    loadComponent: () => import('./my-addresses/my-addresses.page').then(m => m.MyAddressesPage)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./about-us/about-us.page').then(m => m.AboutUsPage)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
