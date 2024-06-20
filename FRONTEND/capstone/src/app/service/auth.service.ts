import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthData } from '../interface/auth-data.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { User } from '../interface/user.interface';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  private authSub = new BehaviorSubject<AuthData | null | SocialUser>(null);
  user$ = this.authSub.asObservable();
  private timeout!: any;

  constructor(private http: HttpClient, private router: Router, private authService: SocialAuthService) {
    this.authService.authState.subscribe((user) => {
      this.authSub.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/']);
    });
   }
  

  register(data: { username: string, password: string, email: string, nome: string, cognome: string }) {
    return this.http.post(`${environment.apiUrl}auth/register`, data).pipe(
      catchError(this.errors)
    );
  }

  login(data: { email: string, password: string }) {
    console.log(data);
    return this.http.post<AuthData>(`${environment.apiUrl}auth/login`, data).pipe(
      tap((data) => {
        console.log('Auth:', data);
      }),
      tap(async (user) => {
        this.authSub.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.autoLogout(user);
      }),
      catchError(this.errors)
    );
  }

  updateUser(data: User) {
    // const currentUser = this.authSub.getValue();
    // if (currentUser) {
    //   currentUser.user = data;
    //   this.authSub.next(currentUser);
    //   localStorage.setItem('user', JSON.stringify(currentUser));
    // }
  }

  logout() {
    this.authSub.next(null);
    localStorage.removeItem('user');
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.router.navigate(['/']);
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
    const user: AuthData = JSON.parse(userJson);
    this.authSub.next(user);
    this.router.navigate(['/dashboard']);
    this.autoLogout(user);
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
}
