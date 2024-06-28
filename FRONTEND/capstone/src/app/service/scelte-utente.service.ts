import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScelteUtenteService {
  private choices: any = {
    planet: '',
    ship: '',
    suit: '',
    planetImg: '',
    shipImg: '',
    suitImg: ''
  };

  constructor() {}

  setChoice(key: string, value: any) {
    this.choices[key] = value;
  }

  getChoices() {
    return this.choices;
  }

  setPlanetImg(img: string) {
    this.choices.planetImg = img;
  }

  setShipImg(img: string) {
    this.choices.shipImg = img;
  }

  setSuit(suit: any) {
    this.choices.suit = suit.nome;
    this.choices.suitImg = suit.immagineFronte; 
  }
}
