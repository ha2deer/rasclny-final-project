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

  // Properties for form controls to avoid getter issues
  usernameControl!: FormControl;
  emailControl!: FormControl;
  phoneControl!: FormControl;
  passwordControl!: FormControl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initializeMode();
    this.initializeForm();
    // **Assign form controls to component properties**
    this.usernameControl = this.applyForm.get('username') as FormControl;
    this.emailControl = this.applyForm.get('email') as FormControl;
    this.phoneControl = this.applyForm.get('phone') as FormControl;
    this.passwordControl = this.applyForm.get('password') as FormControl;
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
        this.errors = err.error;
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
        if (err.error && err.error.error) {
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

  isValid(controlName: string): boolean {
    const control = this.applyForm.get(controlName);
    if (!control) return false;
    return control.invalid && (this.isFormSubmitted || control.touched || control.dirty);
  }

  navigateTo(mode: 'login' | 'signup'): void {
    this.router.navigate([`/auth/${mode}`]);
    this.mode = mode;
    this.applyForm.reset();
    this.isFormSubmitted = false;
    this.initializeForm();
  }
}
