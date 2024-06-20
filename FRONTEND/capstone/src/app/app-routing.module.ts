import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SceltaTutaComponent } from './components/scelta-tuta/scelta-tuta.component';
import { SceltaPianetaComponent } from './components/scelta-pianeta/scelta-pianeta.component';
import { SceltaNaveComponent } from './components/scelta-nave/scelta-nave.component';
import { AutenticazioneComponent } from './components/autenticazione/autenticazione.component';
import { RiepilogoComponent } from './components/riepilogo/riepilogo.component';
import { RecensioniComponent } from './components/recensioni/recensioni.component';



const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: 'sceltaTuta', component: SceltaTutaComponent},
  {path: 'sceltaPianeta', component: SceltaPianetaComponent},
  {path: 'sceltaNave', component: SceltaNaveComponent},
  {path: 'auth', component: AutenticazioneComponent },
  {path: 'riepilogo', component: RiepilogoComponent},
  {path: 'recensioni', component: RecensioniComponent}


];

@NgModule({
  imports: 
  [RouterModule.forRoot(routes)],
  
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
