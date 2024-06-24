import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-tute',
  templateUrl: './admin-tute.component.html',
  styleUrls: ['./admin-tute.component.scss']
})
export class AdminTuteComponent implements OnInit {
  tute: any[] = [];
  newTuta: any = { nome: '', descrizione: '', immagineUrl: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTute();
  }

  loadTute(): void {
    const headers = this.getAuthHeaders();
    this.http.get<any[]>(`${environment.apiUrl}tute_spaziali`, { headers }).subscribe(data => {
      this.tute = data;
    });
  }

  addTuta(): void {
    const headers = this.getAuthHeaders();
    this.http.post(`${environment.apiUrl}tute_spaziali`, this.newTuta, { headers }).subscribe(() => {
      this.loadTute();
      this.newTuta = { nome: '', descrizione: '', immagineUrl: '' };
    });
  }

  updateTuta(tuta: any): void {
    const headers = this.getAuthHeaders();
    this.http.put(`${environment.apiUrl}tute_spaziali/${tuta.id}`, tuta, { headers }).subscribe(() => {
      this.loadTute();
    });
  }

  deleteTuta(id: number): void {
    const headers = this.getAuthHeaders();
    this.http.delete(`${environment.apiUrl}tute_spaziali/${id}`, { headers }).subscribe(() => {
      this.loadTute();
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}