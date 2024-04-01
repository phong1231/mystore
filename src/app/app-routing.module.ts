import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ContactComponent } from './component/contact/contact.component';
import { AddproductComponent } from './component/addproduct/addproduct.component';
import { AboutComponent } from './component/about/about.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { FooterComponent } from './component/footer/footer.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent},
  { path: 'cart' , component: CartComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'addproduct', component: AddproductComponent},
  { path : 'about', component: AboutComponent},
  { path :'footer', component: FooterComponent},
  { path: 'product/:id', component: ProductDetailComponent } // Thêm route này
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
