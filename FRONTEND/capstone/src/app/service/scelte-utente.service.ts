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

  private bookedTrips: any[] = []; // Array per memorizzare i viaggi prenotati dall'utente

  constructor() {
    // Carica i viaggi prenotati dal localStorage all'avvio del servizio
    const storedTrips = localStorage.getItem('bookedTrips');
    if (storedTrips) {
      this.bookedTrips = JSON.parse(storedTrips);
    }
  }

  // Metodi per gestire le scelte di pianeta, nave, tuta e relative immagini
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

  // Metodi per gestire i viaggi prenotati dell'utente
  addBookedTrip(tripData: any) {
    this.bookedTrips.push(tripData);
    this.updateLocalStorage();
  }

  getBookedTrips() {
    return this.bookedTrips;
  }

  clearBookedTrips() {
    this.bookedTrips = [];
    localStorage.removeItem('bookedTrips');
  }

  private updateLocalStorage() {
    localStorage.setItem('bookedTrips', JSON.stringify(this.bookedTrips));
  }
}
