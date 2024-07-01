import { Component, OnInit, ViewChild } from '@angular/core';
import { ScelteUtenteService } from 'src/app/service/scelte-utente.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit {

  @ViewChild(CheckoutComponent) checkoutComponent!: CheckoutComponent; 

  choices: any; 

  buyerName: string = '';
  email: string = '';
  selectedDate: string = '';
  availableDates: string[] = [];

  private apiUrl = `${environment.apiUrl}api/biglietti/submit-order`;
  private datesUrl = `${environment.apiUrl}api/dates`; 

  constructor(
    private scelteUtenteService: ScelteUtenteService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserChoices(); 
    this.loadAvailableDates(); 
  }

  loadUserChoices(): void {
    this.choices = this.scelteUtenteService.getChoices(); 
    this.authService.user$.subscribe(user => {
      if (user) {
        this.buyerName = user.user.nome;  
        this.email = user.user.email;    
      } else {
        this.router.navigate(['/auth']); 
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
        console.log('Loaded dates:', this.availableDates); 
      },
      error => {
        console.error('Errore nel caricamento delle date disponibili:', error);
      }
    );
  }

  async unisciFunzionalita(): Promise<void> {
    if (confirm('Vuoi procedere con l\'acquisto?')) {
      await this.onSubmit();  // Aspetta che l'invio del modulo sia completato
      await this.checkoutComponent.pay(); // Poi esegui il pagamento
    }
  }

  async onSubmit(): Promise<void> {
    const data = {
      buyerName: this.buyerName,
      email: this.email,
      planet: this.choices.planet,
      ship: this.choices.ship,
      suit: this.choices.suit,
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
  
    // Effettua la richiesta POST per inviare l'ordine
    await this.http.post(this.apiUrl, data, { headers }).toPromise().then(
      response => {
        // Aggiungi il viaggio prenotato al servizio ScelteUtenteService
        this.scelteUtenteService.addBookedTrip(data);
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
