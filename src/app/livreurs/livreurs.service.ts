import { LivreurType } from './livreur.model';
import { Livreurs } from './livreurs.data';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LivreursService {
  selectedLivreur: LivreurType | undefined;

  selectLivreur(livreur: LivreurType | undefined) {
    this.selectedLivreur = livreur;
  }

  get livreurs() {
    return Livreurs;
  }
}
