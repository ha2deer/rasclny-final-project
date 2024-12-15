import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ChatbootComponent } from './components/chatboot/chatboot.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { OurComponent } from './components/our/our.component';
import { PointsComponent } from './components/points/points.component';
import { ProductPointsComponent } from './components/product-points/product-points.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { IntroComponent } from './pages/intro/intro.component';
import { ProductCAardComponent } from './pages/product-caard/product-caard.component';
import { ProductsComponent } from './pages/products/products.component';
import { RequestComponent } from './pages/request/request.component';
import { SinglProductComponent } from './pages/singl-product/singl-product.component';
import { AuthGuard } from './services/auth.guard';
import { NoAuthGuard } from './services/no-auth.guard';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products/:id', component: ProductsComponent }, // Corrected dynamic route
  { path: 'category', component: CategoryComponent },
  {path: 'logout', component: LogoutComponent, canActivate:[AuthGuard]},
  { path: 'auth', component: AuthComponent ,canActivate: [NoAuthGuard]},
  { path: 'auth/:mode', component: AuthComponent,canActivate: [NoAuthGuard]},
  { path: 'product/:productName', component: SinglProductComponent },
  { path: 'cart', component: RequestComponent ,canActivate: [AuthGuard] },// مش شغاله
  { path: 'intro', component: IntroComponent},
  {path: 'points', component: PointsComponent},
  {path: 'about' , component:AboutusComponent },
  { path: 'profile', component: ProfileComponent , canActivate:[AuthGuard]},
  {path: 'edite', component: EditProfileComponent, canActivate:[AuthGuard]},
  {path: 'product-point', component:ProductPointsComponent},
  {path: 'chat', component: ChatbootComponent },
  {path: 'our', component:OurComponent},
  {path:'ponintreq', component:ProductCAardComponent},
  { path: '**', redirectTo: '/intro' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
