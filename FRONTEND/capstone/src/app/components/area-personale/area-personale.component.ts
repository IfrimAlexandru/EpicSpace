import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.scss']
})
export class AreaPersonaleComponent implements OnInit {
  user: User | null = null;  // Inizializza user come null o con i dati predefiniti
  // Inject AuthService nel costruttore
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();  // Chiama la funzione per caricare i dati dell'utente
  }

  loadUserData(): void {
    this.user = this.authService.getUserFromLocalStorage();
    console.log('User in AreaPersonaleComponent:', this.user);
  }

  logout(): void {
    this.authService.logout();
  }
}
