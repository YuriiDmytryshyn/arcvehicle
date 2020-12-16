import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { VectorComponent } from './pages/vector/vector.component';
import { NewsComponent } from './pages/news/news.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'vector', component: VectorComponent },
  { path: 'news', component: NewsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'admin-login', component: AdminAuthComponent },
  {
    path: 'admin', component: AdminComponent, canActivate:
      [AdminGuard], children: [
        { path: 'news', component: AdminNewsComponent },
      ]
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
