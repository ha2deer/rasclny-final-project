import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BACKEND_URL = "https://recycle.kero-dev.tech/api";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Toggle Login State
  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  // Get Authentication Status
  status(): Observable<boolean> {
    const localData = localStorage.getItem('user');
    if (!localData) {
      this.isLoggedIn.next(false);
      console.log('User not logged in!');
    } else {
      const userObj = JSON.parse(localData);
      const tokenExpiresAt = new Date(userObj.token_expires_at);
      const currentDate = new Date();
      if (tokenExpiresAt > currentDate) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
        console.log('Token has expired!');
      }
    }
    return this.isLoggedIn.asObservable();
  }

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${BACKEND_URL}/auth/login`, { email, password }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Failed to login. Please check your credentials.'));
      })
    );
  }

  // Fetch User Info
  user(): Observable<any> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Authentication token is missing. Please log in again.'));
    const headers = this.createHeaders(token);
    return this.http.get(`${BACKEND_URL}/user`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching user info:', error);
        return throwError(() => new Error('Failed to fetch user information.'));
      })
    );
  }

  // Logout
  logout(allDevice: boolean): Observable<any> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Authentication token is missing. Please log in again.'));
    const headers = this.createHeaders(token);
    return this.http.post(`${BACKEND_URL}/profile/logout`, { allDevice }, { headers }).pipe(
      catchError((error) => {
        console.error('Logout error:', error);
        return throwError(() => new Error('Failed to logout. Please try again.'));
      })
    );
  }


  showProfile(): Observable<any> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Authentication token is missing. Please log in again.'));
    const headers = this.createHeaders(token);
    return this.http.get(`${BACKEND_URL}/profile/show`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching profile:', error);
        return throwError(() => new Error('Failed to fetch profile.'));
      })
    );
  }

  // Edit User Profile
  editProfile(): Observable<any> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Authentication token is missing. Please log in again.'));
    const headers = this.createHeaders(token);
    return this.http.get(`${BACKEND_URL}/profile/edit`, { headers }).pipe(
      catchError((error) => {
        console.error('Error editing profile:', error);
        return throwError(() => new Error('Failed to fetch editable profile data.'));
      })
    );
  }

  // Update User Profile
  updateProfile(data: any): Observable<any> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Authentication token is missing. Please log in again.'));
    const headers = this.createHeaders(token);
    return this.http.post(`${BACKEND_URL}/profile/update`, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating profile:', error);
        return throwError(() => new Error('Failed to update profile. Please try again later.'));
      })
    );
  }

  // Register
  register(
    username: string,
    email: string,
    password: string,
    phone: string,
    gender: string
  ): Observable<any> {
    const data = {
      username,
      email,
      password,
      phone,
      gender,
    };
  
    // Set the headers
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });
  
    // Make the HTTP POST request with headers
    return this.http.post(`${BACKEND_URL}/auth/register`, data, { headers }).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Failed to register. Please try again.'));
      })
    );
  }
  

  // Forgot Password
  forgot(email: string): Observable<any> {
    return this.http.post(`${BACKEND_URL}/auth/forgot`, { email }).pipe(
      catchError((error) => {
        console.error('Forgot password error:', error);
        return throwError(() => new Error('Failed to send reset email.'));
      })
    );
  }

  // Reset Password
  reset(token: string, password: string, passwordConfirmation: string): Observable<any> {
    const data = {
      token,
      password,
      password_confirmation: passwordConfirmation,
    };
    return this.http.post(`${BACKEND_URL}/auth/reset`, data).pipe(
      catchError((error) => {
        console.error('Password reset error:', error);
        return throwError(() => new Error('Failed to reset password. Please try again.'));
      })
    );
  }

  // Utility: Get Token from Local Storage
  private getToken(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : null;
  }

  // Utility: Create Headers
  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    });
  }
}
