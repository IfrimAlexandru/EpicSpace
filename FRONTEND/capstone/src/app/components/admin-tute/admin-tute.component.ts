import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-tute',
  templateUrl: './admin-tute.component.html',
  styleUrls: ['./admin-tute.component.scss']
})
export class AdminTuteComponent implements OnInit {
  tute: any[] = [];
  newTuta: any = { nome: '', descrizione: '', immagineFronte: '', immagineRetro: '' };
  selectedFronteFile: File | null = null;
  selectedRetroFile: File | null = null;
  selectedFronteFileUpdate: { [key: number]: File | null } = {};
  selectedRetroFileUpdate: { [key: number]: File | null } = {};

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

  onFronteFileSelected(event: any): void {
    this.selectedFronteFile = event.target.files[0];
  }

  onRetroFileSelected(event: any): void {
    this.selectedRetroFile = event.target.files[0];
  }

  onFronteFileUpdateSelected(event: any, tutaId: number): void {
    this.selectedFronteFileUpdate[tutaId] = event.target.files[0];
  }

  onRetroFileUpdateSelected(event: any, tutaId: number): void {
    this.selectedRetroFileUpdate[tutaId] = event.target.files[0];
  }

  uploadFile(id: number, file: File, type: 'front' | 'back') {
    const formData = new FormData();
    formData.append('file', file);

    let url = '';
    if (type === 'front') {
      url = `${environment.apiUrl}api/uploadTutaSpazialeImageFront/${id}`;
    } else {
      url = `${environment.apiUrl}api/uploadTutaSpazialeImageBack/${id}`;
    }

    const headers = this.getAuthHeaders(); // Aggiunto il token di autenticazione
    console.log('Uploading file to:', url); // Log URL for debugging
    console.log('Headers:', headers); // Log headers for debugging

    return this.http.patch<{ url: string }>(url, formData, { headers });
  }

  async addTuta(): Promise<void> {
    const headers = this.getAuthHeaders();
    const newTuta = await this.http.post<any>(`${environment.apiUrl}tute_spaziali`, this.newTuta, { headers }).toPromise();

    if (this.selectedFronteFile) {
      const immagineFronte = await this.uploadFile(newTuta.id, this.selectedFronteFile, 'front');
      if (immagineFronte) {
        this.newTuta.immagineFronte = immagineFronte;
      }
    }
    if (this.selectedRetroFile) {
      const immagineRetro = await this.uploadFile(newTuta.id, this.selectedRetroFile, 'back');
      if (immagineRetro) {
        this.newTuta.immagineRetro = immagineRetro;
      }
    }

    this.loadTute();
    this.newTuta = { nome: '', descrizione: '', immagineFronte: '', immagineRetro: '' };
    this.selectedFronteFile = null;
    this.selectedRetroFile = null;
  }

  async updateTuta(tuta: any): Promise<void> {
    const headers = this.getAuthHeaders();

    if (this.selectedFronteFileUpdate[tuta.id]) {
      this.uploadFile(tuta.id, this.selectedFronteFileUpdate[tuta.id] as File, 'front').subscribe(url=>{
        tuta.immagineFronte=url;
    });
  }

    if (this.selectedRetroFileUpdate[tuta.id]) {
      this.uploadFile(tuta.id, this.selectedRetroFileUpdate[tuta.id] as File, 'back').subscribe(url=>{
        tuta.immagineRetro=url;
      });
    }

    setTimeout(()=>{
      this.http.put(`${environment.apiUrl}tute_spaziali/${tuta.id}`, tuta, { headers }).subscribe(() => {
      this.loadTute();
    });
    },2000)
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
