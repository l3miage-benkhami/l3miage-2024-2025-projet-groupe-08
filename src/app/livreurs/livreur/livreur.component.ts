import { Component, Input } from '@angular/core';
import { LivreursService } from '../livreurs.service';
import { LivraisonsService } from '../../livraisons/livraisons.service';
import { LivreurType } from '../livreur.model';

@Component({
  selector: 'livreur',
  imports: [],
  templateUrl: './livreur.component.html',
  styleUrl: './livreur.component.css',
})
export class LivreurComponent {
  @Input({ required: true }) livreur!: LivreurType | undefined;

  constructor(
    private livreursService: LivreursService,
    private livraisonService: LivraisonsService
  ) {}

  handleLivreurClicked(livreur: LivreurType) {
    this.livreursService.selectLivreur(livreur);
    this.livraisonService.filterLivraisons(livreur.id);
  }

  get isSelected() {
    return this.livreursService.selectedLivreur?.id === this.livreur?.id;
  }
}
