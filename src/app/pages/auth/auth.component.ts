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
  mode: 'login' | 'signup' = 'login';
  applyForm!: FormGroup;
  isFormSubmitted = false;
  disabled = false;
  errors: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initializeMode();
    this.initializeForm();
  }

  private initializeMode(): void {
    const modeParam = this.route.snapshot.paramMap.get('mode')?.trim().toLowerCase();
    this.mode = modeParam === 'signup' || modeParam === 'login' ? (modeParam as 'login' | 'signup') : 'login';
  }

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

    if (this.mode === 'signup') {
      this.applyForm.addControl('username', new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[^\s]+$/) // Ensures no spaces in username
      ]));
      this.applyForm.addControl('phone', new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?[0-9]{10,14}$/),
      ]));
      this.applyForm.addControl('gender', new FormControl('', [Validators.required]));
    }
  }

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

  private handleLogin({ email, password }: any): void {
    this.auth.login(email, password).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.handleError(err);
        this.disabled = false;
      },
    });
  }

  private handleSignup({ username, email, password, phone, gender }: any): void {
    this.auth.register(username, email, password, phone, gender).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.handleError(err);
        this.disabled = false;
      },
    });
  }

  private handleError(err: any): void {
    let errorMessages: string[] = [];

    if (err?.error?.error) {
      errorMessages.push(err.error.error);
    } 

    if (err?.error) {
      Object.keys(err.error).forEach((key) => {
        const control = this.applyForm.get(key);
        if (control) {
          const serverErrors = Array.isArray(err.error[key]) ? err.error[key].join(', ') : err.error[key];
          control.setErrors({ serverError: serverErrors });
          errorMessages.push(`${key}: ${serverErrors}`);
        }
      });
    } 

    if (errorMessages.length === 0) {
      errorMessages.push('Failed to login. Please check your credentials.');
    }

    this.errors = { message: errorMessages.join('<br>') };
  }

  isValid(controlName: string): boolean {
    const control = this.applyForm.get(controlName);
    if (!control) return false;
    return control.invalid && (this.isFormSubmitted || control.touched || control.dirty);
  }

  navigateTo(mode: 'login' | 'signup'): void {
    this.mode = mode;
    this.applyForm.reset();
    this.isFormSubmitted = false;
    this.initializeForm();
    this.router.navigate([`/auth/${mode}`]);
  }
}
