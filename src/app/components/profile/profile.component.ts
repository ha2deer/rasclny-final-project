import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null; // Holds the user profile data
  isLoading: boolean = true; // Loading state
  errorMessage: string | null = null; // Error message

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.showProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.errorMessage = 'Failed to load profile. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
