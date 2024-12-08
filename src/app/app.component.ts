import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CartService } from './services/cart.service';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Depi-GradProject';
  isAuth: boolean = false; // Tracks authentication state
  currentRoute: string = ''; // Tracks the current route

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    // Monitor route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

    // Get authentication status from AuthenticationService
    this.authService.status().subscribe({
      next: (isLoggedIn) => {
        this.isAuth = isLoggedIn;
        console.log('isAuth:', this.isAuth); // Log authentication state here
      },
      error: (error) => {
        console.error('Error fetching authentication status:', error);
      },
    });

    // Initialize cart state
    this.cart.setState();
  }
}
