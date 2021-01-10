import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { SearchCategoryPipe } from './shared/pipes/search-category.pipe';
import { SearchProductPipe } from './shared/pipes/search-product.pipe';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import { ngxUiLoaderConfig } from "./preloader-config"

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { VectorComponent } from './pages/vector/vector.component';
import { ShopComponent } from './pages/shop/shop.component';
import { NewsComponent } from './pages/news/news.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BasketComponent } from './pages/basket/basket.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    VectorComponent,
    NewsComponent,
    AdminComponent,
    AdminNewsComponent,
    AdminAuthComponent,
    ShopComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    ProductDetailsComponent,
    SearchCategoryPipe,
    SearchProductPipe,
    ProfileComponent,
    BasketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
