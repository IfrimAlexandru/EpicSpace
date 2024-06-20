import { Component } from '@angular/core';
import { ScelteUtenteService } from 'src/app/service/scelte-utente.service';

@Component({
  selector: 'app-scelta-nave',
  templateUrl: './scelta-nave.component.html',
  styleUrls: ['./scelta-nave.component.scss']
})
export class SceltaNaveComponent {
  selectedShip: keyof typeof this.shipDetails = 'Nave1';

  shipDetails = {
    Nave1: {
      flightTime: '24 hrs',
      distance: '384,400 km',
      price: 'Since $5000'
    },
    Nave2: {
      flightTime: '48 hrs',
      distance: '225 million km',
      price: 'Since $20000'
    },
    Nave3: {
      flightTime: '72 hrs',
      distance: '628 million km',
      price: 'Since $30000'
    },
    Nave4: {
      flightTime: '72 hrs',
      distance: '628 million km',
      price: 'Since $30000'
    },
    Nave5: {
      flightTime: '722 hrs',
      distance: '628 million km',
      price: 'Since $30000'
    },
    Nave6: {
      flightTime: '72 hrs',
      distance: '628 million km',
      price: 'Since $30000'
    }
  };

  constructor(private scelteUtenteService: ScelteUtenteService) {}

  get details() {
    return this.shipDetails[this.selectedShip];
  }

  selectShip(ship: keyof typeof this.shipDetails) {
    this.selectedShip = ship;
    this.scelteUtenteService.setChoice('ship', ship);
    this.updateSelectedShipUI();
  }

  bookFlight() {
    alert('Flight booked successfully!');
  }

  private updateSelectedShipUI() {
    const ships = document.querySelectorAll('.ship img');
    ships.forEach((img) => {
      img.classList.remove('selected');
    });
    const selectedImg = document.querySelector(`.ship img[alt="${this.selectedShip}"]`);
    if (selectedImg) {
      selectedImg.classList.add('selected');
    }
  }
}
