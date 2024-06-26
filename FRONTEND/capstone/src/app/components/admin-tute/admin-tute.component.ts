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
    console.log('Selected front file:', this.selectedFronteFile); // Log file for debugging
  }

  onRetroFileSelected(event: any): void {
    this.selectedRetroFile = event.target.files[0];
    console.log('Selected back file:', this.selectedRetroFile); // Log file for debugging
  }

  onFronteFileUpdateSelected(event: any, tutaId: number): void {
    this.selectedFronteFileUpdate[tutaId] = event.target.files[0];
    console.log(`Selected front file for update (ID: ${tutaId}):`, this.selectedFronteFileUpdate[tutaId]); // Log file for debugging
  }

  onRetroFileUpdateSelected(event: any, tutaId: number): void {
    this.selectedRetroFileUpdate[tutaId] = event.target.files[0];
    console.log(`Selected back file for update (ID: ${tutaId}):`, this.selectedRetroFileUpdate[tutaId]); // Log file for debugging
  }

  uploadFile(id: number, file: File, type: 'front' | 'back'): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    let url = '';
    if (type === 'front') {
      url = `${environment.apiUrl}api/uploadTutaSpazialeImageFront/${id}`;
    } else {
      url = `${environment.apiUrl}api/uploadTutaSpazialeImageBack/${id}`;
    }

    const headers = this.getAuthHeaders();
    console.log('Uploading file to:', url); // Log URL for debugging
    console.log('Headers:', headers); // Log headers for debugging

    return this.http.patch<{ url: string }>(url, formData, { headers });
  }

  async addTuta(): Promise<void> {
    const headers = this.getAuthHeaders();
    const newTuta = await this.http.post<any>(`${environment.apiUrl}tute_spaziali`, this.newTuta, { headers }).toPromise();
    console.log('New tuta created:', newTuta); // Log new tuta for debugging

    if (this.selectedFronteFile) {
      const immagineFronte = await this.uploadFile(newTuta.id, this.selectedFronteFile, 'front').toPromise();
      if (immagineFronte) {
        this.newTuta.immagineFronte = immagineFronte.url;
      }
    }

    if (this.selectedRetroFile) {
      const immagineRetro = await this.uploadFile(newTuta.id, this.selectedRetroFile, 'back').toPromise();
      if (immagineRetro) {
        this.newTuta.immagineRetro = immagineRetro.url;
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
      const immagineFronte = await this.uploadFile(tuta.id, this.selectedFronteFileUpdate[tuta.id] as File, 'front').toPromise();
      if (immagineFronte) {
        tuta.immagineFronte = immagineFronte.url;
      }
    }

    if (this.selectedRetroFileUpdate[tuta.id]) {
      const immagineRetro = await this.uploadFile(tuta.id, this.selectedRetroFileUpdate[tuta.id] as File, 'back').toPromise();
      if (immagineRetro) {
        tuta.immagineRetro = immagineRetro.url;
      }
    }

    await this.http.put(`${environment.apiUrl}tute_spaziali/${tuta.id}`, tuta, { headers }).toPromise();
    this.loadTute();
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
