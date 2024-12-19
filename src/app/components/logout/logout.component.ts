import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  template: '', // No template content
})
export class LogoutComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Trigger the logout process when the component initializes
    this.logout();
  }

  logout(): void {
    this.auth.logout(true).subscribe({
      next: (res) => {
        console.log('Logout successful:', res);

        // Clear user data from localStorage
        localStorage.removeItem('user');

        // Update authentication state
        this.auth.toggleLogin(false);

        // Redirect to the home page
        this.router.navigate(['/']);
      },
      error: (err) => {
        // Clear user data from localStorage
        localStorage.removeItem('user');

        // Update authentication state
        this.auth.toggleLogin(false);
        console.error('Error during logout:', err);

        // Redirect to the home page even if logout fails
        this.router.navigate(['/']);
      }
    });
  }
}
