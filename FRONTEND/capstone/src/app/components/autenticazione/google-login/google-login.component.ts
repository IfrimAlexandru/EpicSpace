import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, Output } from '@angular/core';

declare global {
  interface Window {
      google: any;
  }
}


@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent {
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

  createFakeGoogleWrapper = () => {
      const googleLoginWrapper = document.createElement('div');
      googleLoginWrapper.style.display = 'none';
      googleLoginWrapper.classList.add('custom-google-button');
      document.body.appendChild(googleLoginWrapper);
      window.google.accounts.id.renderButton(googleLoginWrapper, {
          type: 'icon',
          width: '200',
      });

      const googleLoginWrapperButton = googleLoginWrapper.querySelector(
          'div[role=button]'
      ) as HTMLElement;

      return {
          click: () => {
              googleLoginWrapperButton?.click();
          },
      };
  };

  handleGoogleLogin() {
      this.loginWithGoogle.emit(this.createFakeGoogleWrapper());
  }
}
