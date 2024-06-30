import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pianeta } from 'src/app/interface/pianeta.interface'; // Importa l'interfaccia Pianeta

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  navicelle: any[] = [];
  pianeti: Pianeta[] = []; // Utilizza l'interfaccia Pianeta anziché any[]
  navicellePairs: any[][] = [];  // Array to hold pairs of navicelle
  pianetiGroups: Pianeta[][] = [];   // Array to hold groups of pianeti

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNavicelle();
    this.loadPianeti();
  }

  loadPianeti(): void {
    this.http.get<Pianeta[]>(`${environment.apiUrl}pianeti`).subscribe(data => {
      console.log('Received pianeti data:', data); // Log data for debugging
      this.pianeti = data;
      this.groupPianeti();  // Group pianeti into groups of 3
    });
  }

  loadNavicelle(): void {
    const headers = this.getAuthHeaders();
    this.http.get<any[]>(`${environment.apiUrl}navi_spaziali`, { headers }).subscribe(data => {
      console.log('Received navicelle data:', data); // Log data for debugging
      this.navicelle = data;
      this.groupNavicelleInPairs();  // Group navicelle in pairs
    });
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

  groupNavicelleInPairs(): void {
    for (let i = 0; i < this.navicelle.length; i += 2) {
      this.navicellePairs.push(this.navicelle.slice(i, i + 2));
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  prenotaOra(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/sceltaPianeta']);
    } else {
      this.authService.redirectUrl = '/sceltaPianeta';  // Save the redirect URL
      this.router.navigate(['/auth']);
    }
  }
}
