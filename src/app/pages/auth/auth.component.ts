import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  mode: 'login' | 'signup' = 'login'; // Default to 'login'
  applyForm!: FormGroup; // Reactive form instance
  isFormSubmitted = false; // Tracks form submission
  disabled = false; // Disables the form during async actions
  errors: any = null; // Tracks backend errors

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initializeMode();
    this.initializeForm();
  }

  /**
   * Initializes the mode (login/signup) based on the route parameter.
   */
  private initializeMode(): void {
    const modeParam = this.route.snapshot.paramMap.get('mode')?.trim().toLowerCase();
    this.mode = modeParam === 'signup' || modeParam === 'login' ? (modeParam as 'login' | 'signup') : 'login';
  }

  /**
   * Initializes the reactive form with validation rules.
   */
  private initializeForm(): void {
    this.applyForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    // Add additional controls if in signup mode
    if (this.mode === 'signup') {
      this.applyForm.addControl('username', new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]));
      this.applyForm.addControl('phone', new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?[0-9]{10,14}$/),
      ]));
      this.applyForm.addControl('gender', new FormControl('', [Validators.required]));
    }
  }

  /**
   * Handles form submission for login or signup.
   */
  async submitHandler(): Promise<void> {
    this.isFormSubmitted = true;
    this.disabled = true;

    if (this.applyForm.invalid) {
      this.disabled = false;
      return;
    }

    const formData = this.applyForm.value;

    if (this.mode === 'login') {
      this.handleLogin(formData);
    } else if (this.mode === 'signup') {
      this.handleSignup(formData);
    }
  }

  /**
   * Handles login functionality.
   */
  private handleLogin({ email, password }: any): void {
    this.auth.login(email, password).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errors = err.error;
        this.disabled = false;
      },
    });
  }

  /**
   * Handles signup functionality.
   */
  private handleSignup({ username, email, password, phone, gender }: any): void {
    this.auth.register(username, email, password, phone, gender).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Signup error:', err);
        if (err.error && err.error.error) {
          // Map backend validation errors to form controls
          Object.keys(err.error.error).forEach((key) => {
            const control = this.applyForm.get(key);
            if (control) {
              control.setErrors({ serverError: err.error.error[key][0] });
            }
          });
        } else {
          this.errors = err.error;
        }
        this.disabled = false;
      },
    });
  }

  /**
   * Checks the validity of a specific form control.
   * @param controlName Name of the form control to validate.
   * @returns True if the control is invalid and has been touched or dirty.
   */
  isValid(controlName: string): boolean {
    const control = this.applyForm.get(controlName);

    // Check if the control exists and is invalid
    if (!control) {
      console.warn(`Form control '${controlName}' does not exist.`);
      return false; // Return false for non-existing controls
    }

    // Return true if the control is invalid and has been touched, dirty, or the form is submitted
    return control.invalid && (this.isFormSubmitted || control.touched || control.dirty);
  }

  /**
   * Navigates to the specified mode (login/signup) and resets the form.
   * @param mode The mode to navigate to.
   */
  navigateTo(mode: 'login' | 'signup'): void {
    this.router.navigate([`/auth/${mode}`]);
    this.mode = mode;
    this.applyForm.reset();
    this.isFormSubmitted = false;
    this.initializeForm();
  }
}
