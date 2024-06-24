import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-navicelle',
  templateUrl: './admin-navicelle.component.html',
  styleUrls: ['./admin-navicelle.component.scss']
})
export class AdminNavicelleComponent implements OnInit {
  navicelle: any[] = [];
  newNavicella: any = { nome: '', descrizione: '', immagineUrl: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNavicelle();
  }

  loadNavicelle(): void {
    const headers = this.getAuthHeaders();
    this.http.get<any[]>(`${environment.apiUrl}navi_spaziali`, { headers }).subscribe(data => {
      this.navicelle = data;
    });
  }

  addNavicella(): void {
    const headers = this.getAuthHeaders();
    this.http.post(`${environment.apiUrl}navi_spaziali`, this.newNavicella, { headers }).subscribe(() => {
      this.loadNavicelle();
      this.newNavicella = { nome: '', descrizione: '', immagineUrl: '' };
    });
  }

  updateNavicella(navicella: any): void {
    const headers = this.getAuthHeaders();
    this.http.put(`${environment.apiUrl}navi_spaziali/${navicella.id}`, navicella, { headers }).subscribe(() => {
      this.loadNavicelle();
    });
  }

  deleteNavicella(id: number): void {
    const headers = this.getAuthHeaders();
    this.http.delete(`${environment.apiUrl}navi_spaziali/${id}`, { headers }).subscribe(() => {
      this.loadNavicelle();
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}