import { LivraisonType } from './livraison.model';
import { Livraions } from './livraisons.data';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class LivraisonsService {
  private livraisons = Livraions;
  private filterID : string | undefined;
  get assignedLivraisons() {
    if (this.filterID === undefined) {
      return this.livraisons.filter(liv => liv.livreur != undefined && liv.delivered === false) ;
    } else {
      return this.livraisons.filter(liv => liv.livreur === this.filterID && liv.delivered === false) ;
    }
  }

  get unassignedLivraisons() {
    return this.livraisons.filter(liv => liv.livreur === undefined && liv.delivered === false);
  }


  assignLivraison(idLivraison: string, idLivreur: string) {
    let livIndex = this.unassignedLivraisons.findIndex(
      (livraison) => livraison.id_livraison === idLivraison
    );

    let liv = this.unassignedLivraisons.splice(livIndex, 1)[0];
    liv.livreur = idLivreur;
    this.assignedLivraisons.push(liv);
  }

  filterLivraisons(livreurId: string | undefined) {
    this.filterID = livreurId;
  }

  deliveredLivraison(livraison: LivraisonType) {
    let i  = this.livraisons.findIndex((liv) => liv.id_livraison === livraison.id_livraison);
    this.livraisons[i].delivered = true;
    console.log(this.livraisons);
  }
}
