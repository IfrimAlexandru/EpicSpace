import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SwiperModule } from 'swiper/angular';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SceltaTutaComponent } from './components/scelta-tuta/scelta-tuta.component';
import { SceltaPianetaComponent } from './components/scelta-pianeta/scelta-pianeta.component';
import { D3Component } from './components/d3/d3.component';
import { SceltaNaveComponent } from './components/scelta-nave/scelta-nave.component';
import { RiepilogoComponent } from './components/riepilogo/riepilogo.component';
import { AutenticazioneComponent } from './components/autenticazione/autenticazione.component';
import { RecensioniComponent } from './components/recensioni/recensioni.component';
import { GoogleLoginComponent } from './components/autenticazione/google-login/google-login.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ScelteUtenteService } from './service/scelte-utente.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SceltaTutaComponent,
    SceltaPianetaComponent,
    D3Component,
    SceltaNaveComponent,
    RiepilogoComponent,
    AutenticazioneComponent,
    RecensioniComponent,
    GoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ScelteUtenteService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '722812885951-dvlljpp34qhkm2mgd0vifbtncgh4b7sk.apps.googleusercontent.com', {
                scopes: 'openid profile email',
              }
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
