import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccuielComponent } from '../accuiel/accuiel.component';
import { AjouterLivreComponent } from '../ajouter-livre/ajouter-livre.component';
import { DetailsLivreComponent } from '../details-livre/details-livre.component';

const routes: Routes = [
  { path: '', component: AccuielComponent },
  { path: 'ajouter-livre', component: AjouterLivreComponent },
  { path: 'details-livre/:id', component: DetailsLivreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],
})
export class AppRoutingModule {}
