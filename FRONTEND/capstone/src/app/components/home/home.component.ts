import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private authService: AuthService, private router: Router) {}

  prenotaOra(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/sceltaPianeta']);
    } else {
      this.authService.redirectUrl = '/sceltaPianeta';  // Save the redirect URL
      this.router.navigate(['/auth']);
    }
  }
}
