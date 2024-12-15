import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  profileForm: FormGroup;  // Form to edit profile
  isLoading: boolean = false;  // Loading state for submitting form
  errorMessage: string | null = null;  // Error message if update fails

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form and load the current profile data
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.isLoading = true;
    this.authService.showProfile().subscribe({
      next: (profile) => {
        console.log('---------------------------------------------------------')
        console.log(profile.user.username)
        this.profileForm = this.formBuilder.group({
          id: profile.user.id,
          username: [profile.user.username, Validators.required],
          email: [profile.user.email, [Validators.required, Validators.email]],
          password: ['', [Validators.minLength(6)]],
          password_confirmation: [''],
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile data:', error);
        this.errorMessage = 'Failed to load profile data.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading = true;
    const updatedData = this.profileForm.value;

    // If password is provided, make sure it's confirmed
    if (updatedData.password !== updatedData.password_confirmation) {
      this.errorMessage = "Passwords don't match.";
      this.isLoading = false;
      return;
    }

    // Add _method to simulate PUT request
    updatedData._method = 'PUT';  // Simulating PUT request in body

    const userId = updatedData.id;

    // Remove password_confirmation before sending data to backend
    delete updatedData.password_confirmation;
    delete updatedData.id;

    // Assuming you have a way to get the userId (e.g., from the profile or token)
      // You need to implement this method or pass userId from somewhere

    // Call the service to update the profile
    this.authService.updateProfile(updatedData, userId).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        this.router.navigate(['/profile']);  // Redirect back to the profile page
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Failed to update profile. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
