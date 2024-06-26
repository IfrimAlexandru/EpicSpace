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
  selectedFile: File | null = null;
  selectedFileUpdate: { [key: number]: File | null } = {};

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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onFileUpdateSelected(event: any, navicellaId: number): void {
    this.selectedFileUpdate[navicellaId] = event.target.files[0];
  }

  async uploadFile(file: File, id: number, type: 'navicella'): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    let url = '';
    switch (type) {
      case 'navicella':
        url = `${environment.apiUrl}api/uploadNaveSpazialeImage/${id}`;
        break;
      // Puoi aggiungere altri case per altri tipi di upload, se necessario
    }
    
    const headers = this.getAuthHeaders();

    try {
      const response = await this.http.patch<{ url: string }>(url, formData, { headers }).toPromise();
      if (response && response.url) {
        console.log('Image URL:', response.url);
        return response.url;
      } else {
        throw new Error('Invalid response from upload endpoint');
      }
    } catch (error) {
      console.error('Error uploading file', error);
      return '';
    }
  }

  async addNavicella(): Promise<void> {
    const headers = this.getAuthHeaders();

    const newNavicella = await this.http.post<any>(`${environment.apiUrl}navi_spaziali`, this.newNavicella, { headers }).toPromise();
    if (this.selectedFile) {
      const imageUrl = await this.uploadFile(this.selectedFile, newNavicella.id, 'navicella');
      newNavicella.immagineUrl = imageUrl;
      await this.http.put(`${environment.apiUrl}navi_spaziali/${newNavicella.id}`, newNavicella, { headers }).toPromise();
    }

    this.loadNavicelle();
    this.newNavicella = { nome: '', descrizione: '', immagineUrl: '' };
    this.selectedFile = null;
  }

  async updateNavicella(navicella: any): Promise<void> {
    const headers = this.getAuthHeaders();

    if (this.selectedFileUpdate[navicella.id]) {
      const imageUrl = await this.uploadFile(this.selectedFileUpdate[navicella.id] as File, navicella.id, 'navicella');
      navicella.immagineUrl = imageUrl;
    }

    this.http.put(`${environment.apiUrl}navi_spaziali/${navicella.id}`, navicella, { headers }).subscribe(() => {
      this.loadNavicelle();
      this.selectedFileUpdate[navicella.id] = null;
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
