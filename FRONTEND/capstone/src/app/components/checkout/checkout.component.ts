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

  async pay(price: number, planetName: string): Promise<void> { // Accetta anche il nome del pianeta come parametro
    const payment = {
      name: `Viaggio spaziale per ${planetName}`,
      currency: 'eur', 
      amount: price * 100, 
      quantity: 1,
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success',
    };


    const stripe = await this.stripePromise;

    if (!stripe) {
      console.error('Stripe non è stato caricato correttamente.');
      return;
    }

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post(`${environment.serverUrl}/payment`, payment, { headers }).subscribe((data: any) => {
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
