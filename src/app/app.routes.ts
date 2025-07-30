import { FavoriteProductsComponent } from './pages/favoriteProducts/favorite-products/favorite-products.component';
import { AllOrdersComponent } from './pages/allOrders/all-orders/all-orders.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AuthComponent } from './layout/auth/auth.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { BlankComponent } from './layout/blank/blank.component';
import { Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/Guards/auth/auth.guard';
import { DetailsComponent } from './pages/details/details.component';
import { ForrgotPassComponent } from './pages/ForgotPassword/forrgot-pass/forrgot-pass.component';
import { BrandsComponent} from './pages/brands/brands.component';

export const routes: Routes = [


{path:'' , redirectTo: 'register', pathMatch:'full'},

// for blank component 
{path:'', component:BlankComponent ,canActivate:[authGuard]  ,  children:[
{path:'home', component:HomeComponent , title:'home'},
{path:'categories', component:CategoriesComponent , title:'categories'},
{path:'brand', component:BrandsComponent , title:'brand'},
{path:'products', component:ProductsComponent , title:'products'}, 
{path:'cart', component:CartComponent , title:'cart'},
{path:'Favorite Products', component:FavoriteProductsComponent , title:'Favorite Products'},
{
    path: 'details/:id',
    component: DetailsComponent,
    data: {
      renderMode: 'server'
    }
    , title:'prod Details'
  },
  
// {path:'details/:id', component:DetailsComponent , title:'prod Details'},
{path:'checkOut/:id', component:CheckoutComponent , title:'check Out'},
{path:'allorders', component:AllOrdersComponent , title:'all orders'},




]},


// for auth component 
{path:'', component:AuthComponent , children:[
    {path:'register', component:RegisterComponent , title:'register'},
    {path:'login', component:LoginComponent , title:'login'},
    {path:'forgot pass', component:ForrgotPassComponent , title:'forgot pass'},
   
    ]}
    ,{path:'**', component:NotFoundComponent , title:'Not Found'}

];
