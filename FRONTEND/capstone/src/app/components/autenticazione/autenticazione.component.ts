import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-autenticazione',
  templateUrl: './autenticazione.component.html',
  styleUrls: ['./autenticazione.component.scss']
})
export class AutenticazioneComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initializeEventListeners();
  }

  initializeEventListeners(): void {
    const loginBtn = document.getElementById('login') as HTMLButtonElement;
    const signupBtn = document.getElementById('signup') as HTMLButtonElement;

    loginBtn.addEventListener('click', (e: MouseEvent) => {
      let parent = (e.target as HTMLElement).parentNode!.parentNode as HTMLElement;
      Array.from(parent.classList).find((element) => {
        if (element !== "slide-up") {
          parent.classList.add('slide-up');
        } else {
          (signupBtn.parentNode as HTMLElement).classList.add('slide-up');
          parent.classList.remove('slide-up');
        }
      });
    });

    signupBtn.addEventListener('click', (e: MouseEvent) => {
      let parent = (e.target as HTMLElement).parentNode as HTMLElement;
      Array.from(parent.classList).find((element) => {
        if (element !== "slide-up") {
          parent.classList.add('slide-up');
        } else {
          (loginBtn.parentNode!.parentNode as HTMLElement).classList.add('slide-up');
          parent.classList.remove('slide-up');
        }
      });
    });
  }
}

console.clear();
