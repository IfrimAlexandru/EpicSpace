import { Component, OnInit } from '@angular/core';
import { ScelteUtenteService } from 'src/app/service/scelte-utente.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

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

  constructor(private scelteUtenteService: ScelteUtenteService, private http: HttpClient) {}
  private apiUrl=environment.apiUrl

  ngOnInit() {
    this.choices = this.scelteUtenteService.getChoices();
  }

  onSubmit() {
    const data = {
      buyerName: this.buyerName,
      email: this.email,
      planet: this.choices.planet,
      ship: this.choices.ship,
      suit: this.choices.suit
    };

    this.http.post(`${this.apiUrl}api/biglietti/submit-order`, data)
      .subscribe(response => {
        alert('Ordine ricevuto! Controlla la tua email per il biglietto.');
      }, error => {
        console.error('Error:', error);
      });
  }
}
