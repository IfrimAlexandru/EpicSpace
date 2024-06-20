import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScelteUtenteService {
  private choices = {
    planet: '',
    ship: '',
    suit: ''
  };

  setChoice(type: 'planet' | 'ship' | 'suit', value: string) {
    this.choices[type] = value;
  }

  getChoices() {
    return this.choices;
  }
}
