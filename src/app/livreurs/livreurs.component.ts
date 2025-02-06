import { Component, EventEmitter, Output, Input } from '@angular/core';
import { LivreursService } from './livreurs.service';
import { LivraisonsService } from '../livraisons/livraisons.service';
import { Livreurs } from './livreurs.data';
import { LivreurComponent } from './livreur/livreur.component';
@Component({
  selector: 'livreurs',
  imports: [LivreurComponent],
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.css', '../app.component.css'],
})
export class LivreursComponent {
  constructor(
    private livreursService: LivreursService,
    private livraisonService: LivraisonsService
  ) {}

  get livreurs() {
    return Livreurs;
  }

  get selectedLivreurId() {
    return this.livreursService.selectedLivreur?.id;
  }

  resetLivraisons() {
    this.livreursService.selectLivreur(undefined);
    this.livraisonService.filterLivraisons(undefined);
  }
}
