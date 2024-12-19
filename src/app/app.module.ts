import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ButtonComponent } from './components/button/button.component';
import { HomeTopComponent } from './components/home-top/home-top.component';
import { InfoComponent } from './components/info/info.component';
import { InputComponent } from './components/input/input.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CategoryComponent } from './pages/category/category.component';
import { CardComponent } from './pages/products/card/card.component';
import { ProductsComponent } from './pages/products/products.component';

import { HomeComponent } from './pages/home/home.component';



import { FooterComponent } from './components/footer/footer.component';
import { HomeBottomComponent } from './components/homebottom/home-bottom.component';
import { LeftRequestComponent } from './components/left-request/left-request.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductNavComponent } from './components/product-nav/product-nav.component';
import { RightRequestComponent } from './components/right-request/right-request.component';
import { RequestComponent } from './pages/request/request.component';


import { CatButtonComponent } from './components/cat-button/cat-button.component';
import { SliderComponent } from './components/slider/slider.component';

import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryButtomComponent } from './components/category-buttom/category-buttom.component';
import { ChatbootComponent } from './components/chatboot/chatboot.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { IntroBottomComponent } from './components/intro-bottom/intro-bottom.component';
import { LogoutComponent } from './components/logout/logout.component';
import { OurComponent } from './components/our/our.component';
import { PointsComponent } from './components/points/points.component';
import { ProductPointsComponent } from './components/product-points/product-points.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RightrequestPointsComponent } from './components/rightrequest-points/rightrequest-points.component';
import { IntroComponent } from './pages/intro/intro.component';
import { PointCardComponent } from './pages/product-caard/point-card/point-card.component';
import { ProductCAardComponent } from './pages/product-caard/product-caard.component';
import { RequestPointComponent } from './pages/request-point/request-point.component';
import { OrderCompletedComponent } from './pages/order-completed/order-completed.component';


  @NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      ProductsComponent,
      CardComponent,
      CategoryComponent,
      InputComponent,
      HomeTopComponent,
      AuthComponent,
      LogoutComponent,
      ButtonComponent,
      InfoComponent,

      NavComponent,


      FooterComponent,
      NavComponent,
      HomeBottomComponent,
      RequestComponent,
      RightRequestComponent,
      LeftRequestComponent,

      ProductNavComponent,
      AppComponent,
      CatButtonComponent,
      SliderComponent,
      HomeComponent,
      CartComponent,
      CategoryButtomComponent,
      IntroComponent,
      IntroBottomComponent,
      PointsComponent,
      AboutusComponent,
      ProfileComponent,
      EditProfileComponent,
      ProductPointsComponent,
      ChatbootComponent,
      OurComponent,
      RightrequestPointsComponent,
      RequestPointComponent,
      PointCardComponent,
      ProductCAardComponent,
      OrderCompletedComponent,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
  })
  export class AppModule {
  };

