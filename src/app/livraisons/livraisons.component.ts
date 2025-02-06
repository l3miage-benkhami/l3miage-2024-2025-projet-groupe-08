import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LivraisonType } from './livraison.model';
import { LivraisonsService } from './livraisons.service';
import { LivreursService } from '../livreurs/livreurs.service';

@Component({
  selector: 'livraisons',
  imports: [],
  templateUrl: './livraisons.component.html',
  styleUrls: ['./livraisons.component.css', '../app.component.css'],
})
export class LivraisonsComponent {
  @Input({ required: true }) assigned!: boolean;

  constructor(
    private livraisonsService: LivraisonsService,
    private livreursService: LivreursService
  ) {
    console.log(this.livraisonsService.assignLivraison);
  }

  get selectedLivreur() {
    return this.livreursService.livreurs.find(
      (livreur) => livreur.id === this.livreursService.selectedLivreur?.id
    );
  }

  get livraisons() {
    console.log(this.assigned);
    return this.assigned
      ? this.livraisonsService.assignedLivraisons
      : this.livraisonsService.unassignedLivraisons;
  }

  get livreur() {
    return this.livreursService.selectedLivreur;
  }

  livraisonAssigned(id_livraison: string) {
    this.livraisonsService.assignLivraison(
      id_livraison,
      this.livreursService.selectedLivreur!.id
    );
  }
}
