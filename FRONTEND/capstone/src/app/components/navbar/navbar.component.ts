import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/interface/auth-data.interface';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {
  // [x: string]: any;
  
  // user!: AuthData | null

  //   constructor(private authSrv: AuthService) {}

  //   ngOnInit(): void {
  //     this.authSrv.user$.subscribe((data) => {
  //       this.user = data
  //     })
  //   }
  
  //   logout() {
  //     this.authSrv.logout();
  //   }
  
  // }

  user!: AuthData | null;
  
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      this.user = data;
    });
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/auth']); // Redirect to login after logout
  }

  handleSceltaPianetaClick() {
    if (this.user) {
      this.router.navigate(['/sceltaPianeta']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  redirectToAuth() {
    this.router.navigate(['/auth']);
  }
}
