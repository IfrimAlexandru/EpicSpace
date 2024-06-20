import { Component, AfterViewInit } from '@angular/core';
import { ScelteUtenteService } from 'src/app/service/scelte-utente.service';

@Component({
  selector: 'app-scelta-tuta',
  templateUrl: './scelta-tuta.component.html',
  styleUrls: ['./scelta-tuta.component.scss']
})
export class SceltaTutaComponent implements AfterViewInit {
  selectedSuit: string | null = null;
  isRedSuitFront: boolean = true;
  isGoldSuitFront: boolean = true;

  planetDetails = {
    moon: {
      flightTime: '24 hrs',
      distance: '384,400 km',
      price: 'Since $5000'
    },
    tuta1: {
      flightTime: '48 hrs',
      distance: '225 million km',
      price: 'Since $20000'
    },
    tuta2: {
      flightTime: '72 hrs',
      distance: '628 million km',
      price: 'Since $30000'
    },
    tuta3: {
      flightTime: '72 hrs',
      distance: '628 million km',
      price: 'Since $30000'
    },
    tuta4: {
      flightTime: '72 hrs',
      distance: '628 million km',
      price: 'Since $30000'
    },
    tuta5: {
      flightTime: '72 hrs',
      distance: '628 million km',
      price: 'Since $30000'
    },
    tuta6: {
      flightTime: '72 hrs',
      distance: '628 million km',
      price: 'Since $30000'
    }
  };

  selectedPlanet: keyof typeof this.planetDetails = 'moon';

  constructor(private scelteUtenteService: ScelteUtenteService) {}

  get details() {
    return this.planetDetails[this.selectedPlanet];
  }

  selectPlanet(planet: keyof typeof this.planetDetails) {
    this.selectedPlanet = planet;
    this.updateSelectedPlanetUI();
  }

  selectSuit(suit: string) {
    this.selectedSuit = suit;
    this.scelteUtenteService.setChoice('suit', suit);
    this.updateSelectedSuitUI();
  }

  toggleRedSuitImage() {
    this.isRedSuitFront = !this.isRedSuitFront;
  }

  toggleGoldSuitImage() {
    this.isGoldSuitFront = !this.isGoldSuitFront;
  }

  private updateSelectedPlanetUI() {
    const planets = document.querySelectorAll('.suit img');
    planets.forEach((img) => {
      img.classList.remove('selected');
    });
    const selectedImg = document.querySelector(`.suit img[alt="${this.selectedPlanet}"]`);
    if (selectedImg) {
      selectedImg.classList.add('selected');
    }
  }

  private updateSelectedSuitUI() {
    const suits = document.querySelectorAll('.suit img');
    suits.forEach((img) => {
      img.classList.remove('selected');
    });
    const selectedImg = document.querySelector(`.suit img[alt="${this.selectedSuit}"]`);
    if (selectedImg) {
      selectedImg.classList.add('selected');
    }
  }

  ngAfterViewInit() {
    // Initialize the carousel here if needed
  }
}
