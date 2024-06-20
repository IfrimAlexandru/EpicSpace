import { Component } from '@angular/core';
import { ScelteUtenteService } from 'src/app/service/scelte-utente.service';

@Component({
  selector: 'app-scelta-pianeta',
  templateUrl: './scelta-pianeta.component.html',
  styleUrls: ['./scelta-pianeta.component.scss']
})
export class SceltaPianetaComponent {
  selectedPlanet: keyof typeof this.planetDetails = 'moon';

  planetDetails = {
    moon: {
      flightTime: '3 hrs',
      distance: '384,400 km',
      price: 'Since $2000'
    },
    mars: {
      flightTime: '84 days/ 2hrs with warp',
      distance: '78 million km',
      price: 'Since $20000'
    },
    venere: {
      flightTime: '44 days/ 1hr with warp',
      distance: '41 million km',
      price: 'Since $30000'
    },
    nettuno: {
      flightTime: '5 days with warp(127hrs)',
      distance: '4351 billion km',
      price: 'Since $30000'
    },
    mercurio: {
      flightTime: '83 days(2003hrs)/ 2hrs with warp',
      distance: '77 million km',
      price: 'Since $30000'
    },
    giove: {
      flightTime: '16hrs with warp',
      distance: '628 million km',
      price: 'Since $30000'
    },
    saturno: {
      flightTime: '33hrs with warp',
      distance: '1275 billion km',
      price: 'Since $30000'
    },
    urano: {
      flightTime: '3 days with warp(74 hrs)',
      distance: '2723 billion km',
      price: 'Since $30000'
    },
    plutone: {
      flightTime: '6 days with warp(153 hrs)',
      distance: '5913 billion km',
      price: 'Since $30000'
    }
  };

  constructor(private scelteUtenteService: ScelteUtenteService) {}

  get details() {
    return this.planetDetails[this.selectedPlanet];
  }

  selectPlanet(planet: keyof typeof this.planetDetails) {
    this.selectedPlanet = planet;
    this.scelteUtenteService.setChoice('planet', planet);
    this.updateSelectedPlanetUI();
  }

  private updateSelectedPlanetUI() {
    const planets = document.querySelectorAll('.planet img, .saturno img');
    planets.forEach((img) => {
      img.classList.remove('selected');
    });
    const selectedImg = document.querySelector(`.planet img[alt="${this.selectedPlanet}"], .saturno img[alt="${this.selectedPlanet}"]`);
    if (selectedImg) {
      selectedImg.classList.add('selected');
    }
  }
}
