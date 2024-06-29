import { Component, OnInit } from '@angular/core';
import { ScelteUtenteService } from 'src/app/service/scelte-utente.service';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.scss']
})
export class AreaPersonaleComponent implements OnInit {
  user: User | null = null;
  bookedTrips: any[] = [];

  constructor(
    private authService: AuthService,
    private scelteUtenteService: ScelteUtenteService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadBookedTrips();
  }

  loadUserData(): void {
    this.user = this.authService.getUserFromLocalStorage();
  }

  loadBookedTrips(): void {
    this.bookedTrips = this.scelteUtenteService.getBookedTrips();
  }

  logout(): void {
    this.authService.logout();
  }
}
