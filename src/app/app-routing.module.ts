import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { AdminGuard } from './shared/guards/admin.guard';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'vector', component: VectorComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/:id', component: ProductDetailsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'admin-login', component: AdminAuthComponent },
  {
    path: 'admin', component: AdminComponent, canActivate:
      [AdminGuard], children: [
      { path: 'admin-news', component: AdminNewsComponent },
      { path: 'admin-category', component: AdminCategoryComponent },
      { path: 'admin-products', component: AdminProductsComponent },
      ]
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
