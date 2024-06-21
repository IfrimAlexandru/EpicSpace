import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-autenticazione',
  templateUrl: './autenticazione.component.html',
  styleUrls: ['./autenticazione.component.scss']
})
export class AutenticazioneComponent {
  isLoginActive: boolean = true;
  email: string = '';
  password: string = '';
  username: string = ''; // Per registrazione
  nome: string = ''; // Per registrazione
  cognome: string = ''; // Per registrazione

  constructor(private authService: AuthService, private router: Router) {}

  toggleSlide(isLogin: boolean): void {
    this.isLoginActive = !isLogin;
  }

  onLogin() {
    const loginData = { email: this.email, password: this.password };
    this.authService.login(loginData).subscribe(
      response => {
        console.log('Login successful', response);
        const token = localStorage.getItem('authToken');
        console.log('Token from localStorage after login:', token);
        this.router.navigate(['/']); // Navigate to homepage after successful login
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

  onRegister() {
    const registerData = { username: this.username, password: this.password, email: this.email, nome: this.nome, cognome: this.cognome };
    this.authService.register(registerData).subscribe(
      response => {
        console.log('Registration successful', response);
        this.toggleSlide(true); // Switch to login form after successful registration
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}

//   ngAfterViewInit(): void {
//     this.initializeEventListeners();
//   }

//   initializeEventListeners(): void {
//     const loginBtn = document.getElementById('login') as HTMLButtonElement;
//     const signupBtn = document.getElementById('signup') as HTMLButtonElement;

    // loginBtn.addEventListener('click', (e: MouseEvent) => {
    //   let parent = (e.target as HTMLElement).parentNode!.parentNode as HTMLElement;
    //   Array.from(parent.classList).find((element) => {
    //     if (element !== "slide-up") {
    //       parent.classList.add('slide-up');
    //     } else {
    //       (signupBtn.parentNode as HTMLElement).classList.add('slide-up');
    //       parent.classList.remove('slide-up');
    //     }
    //   });
    // });

//     signupBtn.addEventListener('click', (e: MouseEvent) => {
//       let parent = (e.target as HTMLElement).parentNode as HTMLElement;
//       Array.from(parent.classList).find((element) => {
//         if (element !== "slide-up") {
//           parent.classList.add('slide-up');
//         } else {
//           (loginBtn.parentNode!.parentNode as HTMLElement).classList.add('slide-up');
//           parent.classList.remove('slide-up');
//         }
//       });
//     });
//   }
// }

// console.clear();

// ngAfterViewInit(): void {
//   this.initializeEventListeners();
// }

// initializeEventListeners(): void {
//   const loginBtn = document.getElementById('login') as HTMLButtonElement;
//   const signupBtn = document.getElementById('signup') as HTMLButtonElement;

//   loginBtn.addEventListener('click', (e: MouseEvent) => {
//     let parent = (e.target as HTMLElement).parentNode!.parentNode as HTMLElement;
//     Array.from(parent.classList).find((element) => {
//       if (element !== "slide-up") {
//         parent.classList.add('slide-up');
//       } else {
//         (signupBtn.parentNode as HTMLElement).classList.add('slide-up');
//         parent.classList.remove('slide-up');
//       }
//     });
//   });


//   signupBtn.addEventListener('click', (e: MouseEvent) => {
//     let parent = (e.target as HTMLElement).parentNode as HTMLElement;
//     Array.from(parent.classList).find((element) => {
//       if (element !== "slide-up") {
//         parent.classList.add('slide-up');
//       } else {
//         (loginBtn.parentNode!.parentNode as HTMLElement).classList.add('slide-up');
//         parent.classList.remove('slide-up');
//       }
//     });
//   });
// }
// toggleSlide(clickedButton: HTMLElement, otherButton: HTMLButtonElement): void {
//   const clickedParent = clickedButton.closest('.parent-class') as HTMLElement; // Assuming a common parent class for sections
//   const otherParent = otherButton.closest('.parent-class') as HTMLElement;

//   if (!clickedParent.classList.contains('slide-up')) {
//     clickedParent.classList.add('slide-up');
//     otherParent.classList.remove('slide-up');
//   } else {
//     clickedParent.classList.remove('slide-up');
//     otherParent.classList.add('slide-up');
//   }
// }
// }





//console.clear();
