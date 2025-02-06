export interface LivraisonType {
  id_livraison: string;
  livreur: string | undefined;
  commande: string;
  adresse: string;
  details: string;
  delivered: boolean;
  deliveryDate: Date;
}
