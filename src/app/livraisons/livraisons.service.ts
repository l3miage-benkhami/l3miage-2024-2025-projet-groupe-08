import { Livraions } from './livraisons.data';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class LivraisonsService {
  private livraisons = Livraions;

  assignedLivraisons = this.livraisons.filter(
    (liv) => liv.livreur != undefined
  );
  unassignedLivraisons = this.livraisons.filter(
    (liv) => liv.livreur === undefined
  );

  assignLivraison(idLivraison: string, idLivreur: string) {
    let livIndex = this.unassignedLivraisons.findIndex(
      (livraison) => livraison.id_livraison === idLivraison
    );

    let liv = this.unassignedLivraisons.splice(livIndex, 1)[0];
    liv.livreur = idLivreur;
    this.assignedLivraisons.push(liv);
  }

  filterLivraisons(livreurId: string | undefined) {
    if (livreurId === undefined) {
      this.assignedLivraisons = this.livraisons.filter(
        (liv) => liv.livreur != undefined
      );
    } else {
      this.assignedLivraisons = this.livraisons.filter(
        (liv) => liv.livreur === livreurId
      );
    }
  }
}
