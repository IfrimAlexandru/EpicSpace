import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScelteUtenteService } from 'src/app/service/scelte-utente.service';
import { PlanetService } from 'src/app/service/planet.service';
import { Pianeta } from 'src/app/interface/pianeta.interface';

type PlanetName = "luna" | "marte" | "venere" | "nettuno" | "mercurio" | "giove" | "saturno" | "urano" | "plutone";

@Component({
  selector: 'app-scelta-pianeta',
  templateUrl: './scelta-pianeta.component.html',
  styleUrls: ['./scelta-pianeta.component.scss']
})
export class SceltaPianetaComponent implements OnInit {
  selectedPlanet: PlanetName | null = null;

  planetDetails = {
    luna: {
      flightTime: '3 ore',
      distance: '384,400 km',
      price: 'Since $10000'
    },
    marte: {
      flightTime: '84 days/ 2ore with warp',
      distance: '78 million km',
      price: 'Since $20000'
    },
    venere: {
      flightTime: '44 days/ 1ora with warp',
      distance: '41 million km',
      price: 'Since $30000'
    },
    nettuno: {
      flightTime: '5 days with warp(127ore)',
      distance: '4351 billion km',
      price: 'Since $40000'
    },
    mercurio: {
      flightTime: '83 days(2003hrs)/ 2ore with warp',
      distance: '77 million km',
      price: 'Since $50000'
    },
    giove: {
      flightTime: '16ore with warp',
      distance: '628 million km',
      price: 'Since $60000'
    },
    saturno: {
      flightTime: '33ore with warp',
      distance: '1275 billion km',
      price: 'Since $70000'
    },
    urano: {
      flightTime: '3 days with warp(74 ore)',
      distance: '2723 billion km',
      price: 'Since $80000'
    },
    plutone: {
      flightTime: '6 days with warp(153 ore)',
      distance: '5913 billion km',
      price: 'Since $90000'
    }
  };

  pianeti: Pianeta[] = [];
  pianetiGroups: Pianeta[][] = [];

  constructor(private planetService: PlanetService, private scelteUtenteService: ScelteUtenteService, private router: Router) {}

  ngOnInit(): void {
    this.loadPianeti();
  }

  loadPianeti(): void {
    this.planetService.getPlanets().subscribe(
      (data: Pianeta[]) => {
        console.log('Received pianeti data:', data);
        this.pianeti = data;
        this.groupPianeti();
      },
      error => {
        console.error('Error loading pianeti:', error);
      }
    );
  }

  groupPianeti(): void {
    this.pianetiGroups = [];
    let group: Pianeta[] = [];
    for (let i = 0; i < this.pianeti.length; i++) {
      group.push(this.pianeti[i]);
      if (group.length === 3 || i === this.pianeti.length - 1) {
        this.pianetiGroups.push(group);
        group = [];
      }
    }
  }

  get details() {
    return this.selectedPlanet ? this.planetDetails[this.selectedPlanet] : { flightTime: '', distance: '', price: '' };
  }

  selectPlanet(pianeta: Pianeta): void {
    this.selectedPlanet = pianeta.nome as keyof typeof this.planetDetails;
    this.scelteUtenteService.setChoice('planet', pianeta.nome);
    this.scelteUtenteService.setChoice('planetImg', pianeta.immagine); // Salva l'URL dell'immagine
    console.log('Selected planet image:', pianeta.immagine); // Debug: verifica l'URL dell'immagine
    this.updateSelectedPlanetUI();
  }

  proceedToNextStep(): void {
    if (!this.selectedPlanet) {
      alert('Per favore, seleziona un pianeta prima di procedere.');
      return;
    }
    this.router.navigate(['/sceltaNave']);
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
