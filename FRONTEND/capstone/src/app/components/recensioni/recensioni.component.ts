import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrls: ['./recensioni.component.scss']
})
// export class RecensioniComponent implements OnInit {

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit(): void {}

//   showReviewForm(): void {
//     if (this.authService.isLoggedIn()) {
//       document.getElementById('review-form')!.style.display = 'block';
//     } else {
//       this.router.navigate(['/auth']);
//     }
//   }
// }
export class RecensioniComponent implements OnInit {

  reviewText: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

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
      this.http.post('/api/recensioni', { text }, { headers }).subscribe(response => {
        console.log('Review submitted', response);
        this.reviewText = ''; // Clear the form after submission
      }, error => {
        console.error('Error submitting review', error);
      });
    } else {
      console.error('No token found, user might not be authenticated');
      this.router.navigate(['/auth']);
    }
  }
}