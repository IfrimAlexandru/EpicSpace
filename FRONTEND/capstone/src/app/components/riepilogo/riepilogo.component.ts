import { Component, OnInit } from '@angular/core';
import { ScelteUtenteService } from 'src/app/service/scelte-utente.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit {

  choices: any; // Ora non è più necessario inizializzarla, verrà inizializzata nel metodo ngOnInit
  buyerName: string = '';
  email: string = '';
  selectedDate: string = '';
  availableDates: string[] = [];

  private apiUrl = `${environment.apiUrl}api/biglietti/submit-order`;
  private datesUrl = `${environment.apiUrl}api/dates`; // URL per recuperare le date disponibili

  constructor(
    private scelteUtenteService: ScelteUtenteService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserChoices(); // Carica le scelte dell'utente
    this.loadAvailableDates(); // Carica le date disponibili
  }

  loadUserChoices(): void {
    this.choices = this.scelteUtenteService.getChoices(); // Ottieni le scelte dell'utente dal servizio
    this.authService.user$.subscribe(user => {
      if (user) {
        this.buyerName = user.user.nome;  // Assumendo che l'oggetto user abbia un campo 'nome'
        this.email = user.user.email;    // Assumendo che l'oggetto user abbia un campo 'email'
      } else {
        this.router.navigate(['/auth']);  // Reindirizza al login se non c'è un utente loggato
      }
    });
  }

  loadAvailableDates(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<{ id: number, data: string }[]>(this.datesUrl, { headers }).subscribe(
      data => {
        this.availableDates = data.map(dateObj => dateObj.data);
        console.log('Loaded dates:', this.availableDates); // Log delle date per debug
      },
      error => {
        console.error('Errore nel caricamento delle date disponibili:', error);
      }
    );
  }

  onSubmit(): void {
    const data = {
      buyerName: this.buyerName,
      email: this.email,
      planet: this.choices.planet,
      ship: this.choices.ship,
      suit: this.choices.suit, // Ora prendi solo la scelta della tuta
      planetImg: this.choices.planetImg,
      shipImg: this.choices.shipImg,
      suitImg: this.choices.suitImg,
      selectedDate: this.selectedDate
    };

    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Nessun token trovato, reindirizzando al login.');
      this.router.navigate(['/auth']);
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post(this.apiUrl, data, { headers }).subscribe(
      response => {
        alert('Ordine ricevuto! Controlla la tua email per il biglietto.');
      },
      error => {
        if (error.status === 401) {
          console.error('Errore di autorizzazione, reindirizzando al login.');
          this.router.navigate(['/login']);
        } else {
          console.error('Errore:', error);
        }
      }
    );
  }
}
