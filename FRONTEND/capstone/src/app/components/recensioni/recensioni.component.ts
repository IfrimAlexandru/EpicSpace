import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrls: ['./recensioni.component.scss']
})

export class RecensioniComponent implements OnInit {

  reviewText: string = '';
  recensioni: any[] = [];

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadRecensioni();
  }

  loadRecensioni(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any[]>(`${environment.apiUrl}recensioni`, { headers }).subscribe(data => {
        this.recensioni = data;
      }, error => {
        console.error('Error loading recensioni', error);
      });
    } else {
      this.router.navigate(['/auth']);
    }
  }

  showReviewForm(): void {
    if (this.authService.isLoggedIn()) {
      document.getElementById('review-form')!.style.display = 'block';
    } else {
      this.router.navigate(['/auth']);
    }
  }

  submitReview(): void {
    const text = this.reviewText;
    const token = this.authService.getToken();

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.post(`${environment.apiUrl}recensioni`, { text }, { headers }).subscribe(response => {
        console.log('Review submitted', response);
        this.reviewText = ''; // Clear the form after submission
        this.loadRecensioni(); // Reload recensioni
      }, error => {
        console.error('Error submitting review', error);
      });
    } else {
      console.error('No token found, user might not be authenticated');
      this.router.navigate(['/auth']);
    }
  }
}
