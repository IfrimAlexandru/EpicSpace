import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SceltaTutaComponent } from './components/scelta-tuta/scelta-tuta.component';
import { SceltaPianetaComponent } from './components/scelta-pianeta/scelta-pianeta.component';
import { SceltaNaveComponent } from './components/scelta-nave/scelta-nave.component';
import { AutenticazioneComponent } from './components/autenticazione/autenticazione.component';
import { RiepilogoComponent } from './components/riepilogo/riepilogo.component';
import { RecensioniComponent } from './components/recensioni/recensioni.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { SuccessComponent } from './components/success/success.component';
import { CancelComponent } from './components/cancel/cancel.component';
import { CheckoutComponent } from './components/checkout/checkout.component';



const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: 'sceltaTuta', component: SceltaTutaComponent},
  {path: 'sceltaPianeta', component: SceltaPianetaComponent, canActivate:[AuthGuard]},
  {path: 'sceltaNave', component: SceltaNaveComponent},
  {path: 'auth', component: AutenticazioneComponent },
  {path: 'riepilogo', component: RiepilogoComponent},
  {path: 'recensioni', component: RecensioniComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'success', component: SuccessComponent},
  {path: 'cancel', component: CancelComponent},
  {path: 'checkout', component: CheckoutComponent}



];

@NgModule({
  imports: 
  [RouterModule.forRoot(routes)],
  
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
