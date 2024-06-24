import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-date',
  templateUrl: './admin-date.component.html',
  styleUrls: ['./admin-date.component.scss']
})
export class AdminDateComponent implements OnInit {
  date: any[] = [];
  newData: any = { data: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDate();
  }

  loadDate(): void {
    const headers = this.getAuthHeaders();
    this.http.get<any[]>(`${environment.apiUrl}data_volo/date`, { headers }).subscribe(data => {
      this.date = data;
    });
  }

  addData(): void {
    const headers = this.getAuthHeaders();
    this.http.post(`${environment.apiUrl}data_volo/date`, this.newData, { headers }).subscribe(() => {
      this.loadDate();
      this.newData = { data: '' };
    });
  }

  updateData(data: any): void {
    const headers = this.getAuthHeaders();
    this.http.put(`${environment.apiUrl}data_volo/date/${data.id}`, data, { headers }).subscribe(() => {
      this.loadDate();
    });
  }

  deleteData(id: number): void {
    const headers = this.getAuthHeaders();
    this.http.delete(`${environment.apiUrl}data_volo/date/${id}`, { headers }).subscribe(() => {
      this.loadDate();
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}