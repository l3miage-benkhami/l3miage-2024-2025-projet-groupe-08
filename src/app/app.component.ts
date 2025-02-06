import { Component } from '@angular/core';
import { LivreursComponent } from './livreurs/livreurs.component';
import { LivraisonsComponent } from './livraisons/livraisons.component';
import { FormsModule } from '@angular/forms';
import { LivreursService } from './livreurs/livreurs.service';
import { LivraisonsService } from './livraisons/livraisons.service';
import { LivreurType } from './livreurs/livreur.model';
import { LivreurComponent } from './livreurs/livreur/livreur.component';
@Component({
  selector: 'app-root',
  imports: [
    LivreursComponent,
    LivraisonsComponent,
    LivreurComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showApp = false;
  enteredEmail = '';
  userType = '';
  currentLivreur?: LivreurType;

  constructor(
    private livreursService: LivreursService,
    private livraisonService: LivraisonsService
  ) {}

  handleEmailSubmission() {
    if (this.enteredEmail === 'plan@mobilis.fr') {
      this.livraisonService.filterLivraisons(undefined);
      this.showApp = true;
      this.userType = 'plan';
    } else {
      let livreur = this.livreursService.livreurs.find(
        (liv) => liv.email === this.enteredEmail
      );
      if (livreur != null && livreur != undefined) {
        this.currentLivreur = livreur;
        this.showApp = true;
        this.userType = 'liv';
        this.livreursService.selectedLivreur = livreur;
        this.livraisonService.filterLivraisons(livreur.id);
      }
    }
  }

  logoutUser() {
    this.enteredEmail = '';
    this.currentLivreur = undefined;
    this.showApp = false;
    this.livreursService.selectedLivreur = undefined;
    this.livraisonService.filterLivraisons(undefined);
  }
}
