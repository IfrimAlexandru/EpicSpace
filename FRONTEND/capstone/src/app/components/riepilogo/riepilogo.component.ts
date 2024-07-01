import { Component, OnInit, ViewChild } from '@angular/core';
import { ScelteUtenteService } from 'src/app/service/scelte-utente.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CheckoutComponent } from '../checkout/checkout.component';

type Planet = 'luna' | 'marte' | 'venere' | 'nettuno' | 'mercurio' | 'giove' | 'saturno' | 'urano' | 'plutone';

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

  planetDetails: Record<Planet, number> = {
    luna: 10000,
    marte: 20000,
    venere: 30000,
    nettuno: 40000,
    mercurio: 50000,
    giove: 60000,
    saturno: 70000,
    urano: 80000,
    plutone: 90000
  };

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
    console.log('Auth Token:', token); // Debugging: Verifica il token
    console.log('Dates URL:', this.datesUrl); // Debugging: Verifica l'URL

    if (!token) {
      console.error('No auth token found, redirecting to login.');
      this.router.navigate(['/auth']);
      return;
    }

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

  getPlanetPrice(planet: Planet): number {
    return this.planetDetails[planet];
  }

  async unisciFunzionalita(): Promise<void> {
    if (confirm('Vuoi procedere con l\'acquisto?')) {
      await this.onSubmit();
      const planet = this.choices.planet as Planet;
      const price = this.getPlanetPrice(planet);
      await this.checkoutComponent.pay(price, planet); // Passa anche il nome del pianeta
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
