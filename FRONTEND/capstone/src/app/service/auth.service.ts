import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthData } from '../interface/auth-data.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { User } from '../interface/user.interface';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();
  private authSub = new BehaviorSubject<AuthData | null >(null);
  user$ = this.authSub.asObservable();
  private timeout!: any;

  constructor(private http: HttpClient, private router: Router) {}

  register(data: { username: string, password: string, email: string, nome: string, cognome: string }) {
    return this.http.post(`${environment.apiUrl}auth/register`, data).pipe(
      catchError(this.errors)
    );
  }

  login(data: { email: string, password: string }) {
    return this.http.post<AuthData>(`${environment.apiUrl}auth/login`, data).pipe(
      tap((authData) => {
        console.log('Auth:', authData);
        localStorage.setItem('authToken', authData.accessToken); // Salva il token nel localStorage
        localStorage.setItem('user', JSON.stringify(authData));
        console.log('Token salvato:', authData.accessToken);
        this.authSub.next(authData);
        this.autoLogout(authData);
        this.router.navigate(['/']); // Reindirizza alla homepage dopo il login
      }),
      catchError(this.errors)
    );
  }
  
  loginGoogle(token: any) {
    return this.http.post<AuthData>(`${environment.apiUrl}auth/login/oauth2/code/google`, token).pipe(
      tap((authData) => {
        localStorage.setItem('authToken', authData.accessToken); // Salva il token nel localStorage
        localStorage.setItem('user', JSON.stringify(authData));
        console.log('Token salvato:', authData.accessToken);
        this.authSub.next(authData);
        this.autoLogout(authData);
        this.router.navigate(['/']); // Reindirizza alla homepage dopo il login
      }),
      catchError(this.errors)
    );
  }

  private initializeGoogleLogin() {
    window.location.reload(); // Questo è un modo semplice ma potrebbe non essere il più elegante
  }

  updateUser(data: User) {
     const currentUser = this.authSub.getValue();
     if (currentUser) {
       currentUser.user = data;
       this.authSub.next(currentUser);
       localStorage.setItem('user', JSON.stringify(currentUser));
     }
  }

  logout() {
    this.authSub.next(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.router.navigate(['/']).then(() => {
      this.initializeGoogleLogin();
    });
  }

  private autoLogout(data: AuthData) {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date;
    const expirationTime = expirationDate.getTime() - new Date().getTime();
    this.timeout = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  async restore() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    try {
      const user: AuthData = JSON.parse(userJson);
      this.authSub.next(user);
      this.router.navigate(['/']);
      this.autoLogout(user);
    } catch (error) {
      console.error('Error parsing user JSON:', error);
      this.logout();
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserRole(): string | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: AuthData = JSON.parse(userJson);
      return user.user.tipoUtente;
    }
    return null;
  }

  private errors(err: any) {
    console.log(err);
    let error = '';
    switch (err.error) {
      case 'Email already exists':
        error = 'Utente già presente';
        break;
      case 'Incorrect password':
        error = 'Password errata';
        break;
      case 'Cannot find user':
        error = 'Utente non trovato';
        break;
      case 'Password is too short':
        error = 'La password è troppo corta';
        break;
      default:
        error = 'Errore nella chiamata';
        break;
    }
    return throwError(error);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}