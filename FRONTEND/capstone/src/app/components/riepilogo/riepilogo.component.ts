import { Component, OnInit } from '@angular/core';
import { ScelteUtenteService } from 'src/app/service/scelte-utente.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit {

  choices: any = {
    planet: '',
    ship: '',
    suit: ''
  };
  buyerName: string = '';
  email: string = '';
  selectedDate: string = '';
  availableDates: string[] = ['2024-07-01', '2024-07-15', '2024-08-01']; // Example dates

  // private apiUrl = environment.apiUrl;
  private apiUrl = `${environment.apiUrl}api/biglietti/submit-order`;

  constructor(
    private scelteUtenteService: ScelteUtenteService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.choices = this.scelteUtenteService.getChoices();
    this.authService.user$.subscribe(user => {
      if (user) {
        this.buyerName = user.user.nome;  // Assuming user object has a 'nome' field
        this.email = user.user.email;    // Assuming user object has an 'email' field
      } else {
        this.router.navigate(['/auth']);  // Redirect to login if no user found
      }
    });
  }

  onSubmit() {
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

    const token = localStorage.getItem('authToken'); // Adjust according to how you store the token

    console.log('Token:', token); // Log the token to the console

    if (!token) {
      console.error('No token found, redirecting to login.');
      this.router.navigate(['/auth']); // Redirect to login if no token is found
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post(this.apiUrl, data, { headers })
        .subscribe(
          response => {
            alert('Ordine ricevuto! Controlla la tua email per il biglietto.');
          },
          error => {
            if (error.status === 401) { // Handle unauthorized error
              console.error('Unauthorized error, redirecting to login.');
              this.router.navigate(['/login']); // Redirect to login on unauthorized error
            } else {
              console.error('Error:', error);
            }
          }
        );
  }
}

