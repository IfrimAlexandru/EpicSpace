import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  stripePromise = loadStripe(environment.stripe);
  constructor(private http: HttpClient) {}

  money = 99900; // Assicurati che l'importo sia corretto

  async pay(): Promise<void> {
    // here we create a payment object
    const payment = {
      name: 'Iphone',
      currency: 'usd',
      amount: this.money, // Deve essere in centesimi
      quantity: 1, // Non stringa
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

    // Verifichiamo che stripe non sia null
    if (!stripe) {
      console.error('Stripe non è stato caricato correttamente.');
      return;
    }

    // Ottieni il token di autorizzazione, ad esempio dal localStorage
    const token = localStorage.getItem('authToken');

    // Crea le intestazioni della richiesta con il token di autorizzazione
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Questa è una chiamata HTTP normale per un'API backend
    this.http.post(`${environment.serverUrl}/payment`, payment, { headers }).subscribe((data: any) => {
      // Utilizzo Stripe per reindirizzare alla pagina di checkout della piattaforma Stripe
      stripe.redirectToCheckout({
        sessionId: data.id,
      }).then((result) => {
        if (result.error) {
          console.error('Errore durante il redirect a Stripe:', result.error.message);
        }
      });
    }, (error) => {
      console.error('Errore durante la chiamata al server:', error);
    });
  }
}