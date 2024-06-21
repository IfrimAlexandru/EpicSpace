import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScelteUtenteService {
  private choices = {
    planet: '',
    ship: '',
    suit: '',
    planetImg: '',
    shipImg: '',
    suitImg: ''
  };

  setChoice(type: 'planet' | 'ship' | 'suit', value: string) {
    this.choices[type] = value;
    // Aggiorna il percorso dell'immagine in base al tipo di scelta
    if (type === 'planet') {
      this.choices.planetImg = `assets/img/${value}.png`;
    } else if (type === 'ship') {
      this.choices.shipImg = `assets/img/immagini-navicelle/${value}.png`;
    } else if (type === 'suit') {
      this.choices.suitImg = `assets/img/immagini-tute/${value}.png`;
    }
  }

  getChoices() {
    return this.choices;
  }
}