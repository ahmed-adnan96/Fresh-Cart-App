import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/nav-blank/nav-blank.component').then(
        (m) => m.NavBlankComponent
      ),
    canActivate: [authGuardGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home',
        data: { animation: 'Home' },
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'Cart',
        data: { animation: 'cart' },
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'productdetails/:id',
        loadComponent: () =>
          import('./components/productdetails/productdetails.component').then(
            (m) => m.ProductdetailsComponent
          ),
        title: 'Productdetails',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
        title: 'Wishlist',
      },
      {
        path: 'categorydetails/:id',
        loadComponent: () =>
          import(
            './components/category-details/category-details.component'
          ).then((m) => m.CategoryDetailsComponent),
        title: 'CategoryDetails',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'allorders',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'brands',
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import('./components/payment-product/payment-product.component').then(
            (m) => m.PaymentProductComponent
          ),
        title: 'Payment product',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./components/user-address/user-address.component').then(
            (m) => m.UserAddressComponent
          ),
        title: 'User',
      },
      {
        path:'updatePassword' , 
        loadComponent:()=>import('./components/update-password/update-password.component').then((m)=>m.UpdatePasswordComponent), 
        title:'Update Password'
      } , 
      {
        path : 'myOrder' , 
        loadComponent:()=>import('./components/allorders/allorders.component').then(m=>m.AllordersComponent), 
        title:'my order'
      }
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/nav-auth/nav-auth.component').then(
        (m) => m.NavAuthComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forget-Password',
        loadComponent: () =>
          import('./components/forget-password/forget-password.component').then(
            (m) => m.ForgetPasswordComponent
          ),
        title: 'Forget Passowrd',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { scrollPositionRestoration:'enabled'}) ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
