import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service'; // Ensure CartService is imported

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuth: boolean = false; 
  isDropdownVisible = false; 
  isCartVisible = false; 
  cartCount: number = 0; 
  userAvatar: string = 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg';

  categoryClass = 'link'; 
  menuOpen: boolean = false; 
  isMobile: boolean = window.innerWidth <= 768; 

  constructor(
    private router: Router, 
    private authService: AuthenticationService, 
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.loadUserAvatar();

    this.authService.status().subscribe((isLoggedIn) => {
      this.isAuth = isLoggedIn; 
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAuthStatus(); 
        this.loadUserAvatar();
        this.updateCategoryClass(event.url);
      }
    });
  

    // Get the initial cart count
    this.cartCount = this.cartService.getCartCount();

    // Listen for changes to the cart state and update cartCount
    this.cartService.state$.subscribe((cart) => {
      this.cartCount = Array.from(cart.values()).reduce((acc, item) => acc + item.totalAmount, 0);
    });
  }

  private updateCategoryClass(url: string): void {
    this.categoryClass = url.slice(1) === 'singleProduct' || url.slice(1) === 'products' ? 'link active' : 'link';
  }

  private checkAuthStatus(): void {
    const user = localStorage.getItem('user');
    this.isAuth = !!user; 
  }

  private loadUserAvatar(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData?.avatar) {
        this.userAvatar = userData.avatar;
      }
    }
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible; 
  }

  logOut(): void {
    this.authService.logout(true).subscribe({
      next: () => {
        localStorage.removeItem('user'); 
        this.isAuth = false; 
        this.router.navigate(['/auth']); 
      },
      error: (err) => {
        console.error('Error during logout:', err);
      },
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen; 
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth <= 768; 
  }
}
