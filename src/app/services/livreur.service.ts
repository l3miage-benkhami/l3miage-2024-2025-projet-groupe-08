import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {

  constructor() { }

  readonly LIVREURS = [
    { id: 1, trigramme: 'EBD', prenom: 'élisa', nom: 'BERAND', photo: 'Selection_999(635).jpg', telephone: '0678541296', email: 'ebd@mobilis.fr', emploi: 'livreur', entrepot: 'Grenis', tournee: -1 },
    { id: 2, trigramme: 'SWL', prenom: 'sophie', nom: 'WHEEL', photo: 'Selection_999(634).jpg', telephone: '0685698568', email: 'swl@mobilis.fr', emploi: 'livreur', entrepot: 'Grenis', tournee: -1 },
    { id: 3, trigramme: 'MPK', prenom: 'marja', nom: 'POLIK', photo: 'Selection_999(633).jpg', telephone: '0612885685', email: 'mpk@mobilis.fr', emploi: 'livreur', entrepot: 'Grenis', tournee: -1 },
    { id: 4, trigramme: 'CMJ', prenom: 'citeb', nom: 'MARUJ', photo: 'Selection_999(632).jpg', telephone: '0657477854', email: 'cmj@mobilis.fr', emploi: 'livreur', entrepot: 'Grenis', tournee: -1 },
    { id: 5, trigramme: 'MKR', prenom: 'malik', nom: 'KEPLER', photo: 'Selection_999(630).jpg', telephone: '0685584112', email: 'mkr@mobilis.fr', emploi: 'livreur', entrepot: 'Grenis', tournee: -1 },
    { id: 6, trigramme: 'OET', prenom: 'olga', nom: 'EKKART', photo: 'Selection_999(626).jpg', telephone: '0652145821', email: 'oet@mobilis.fr', emploi: 'livreur', entrepot: 'Grenis', tournee: -1 },
    { id: 7, trigramme: 'AAA', prenom: 'anais', nom: 'ANNA', photo: 'Selection_999(631).jpg', telephone: '0657813525', email: 'aaa@mobilis.fr', emploi: 'livreur', entrepot: 'Bronis', tournee: -1 },
    { id: 8, trigramme: 'WKT', prenom: 'wong', nom: 'KENT', photo: 'Selection_999(628).jpg', telephone: '0658548526', email: 'wkt@mobilis.fr', emploi: 'livreur', entrepot: 'Bronis', tournee: -1 },
    { id: 9, trigramme: 'CJE', prenom: 'carolyn', nom: 'JUNE', photo: 'Selection_999(627).jpg', telephone: '0658400001', email: 'cje@mobilis.fr', emploi: 'livreur', entrepot: 'Bronis', tournee: -1 },
    { id: 10, trigramme: 'MPT', prenom: 'michel', nom: 'PARROT', photo: 'Selection_999(637).jpg', telephone: '0689752214', email: 'mpt@mobilis.fr', emploi: 'livreur', entrepot: 'Bronis', tournee: -1 },
    { id: 11, trigramme: 'PMT', prenom: 'paul', nom: 'MERLOT', photo: 'Selection_999(639).jpg', telephone: '0644732212', email: 'pmt@mobilis.fr', emploi: 'livreur', entrepot: 'Bronis', tournee: -1 },
    { id: 12, trigramme: 'MNL', prenom: 'maurice', nom: 'NEEL', photo: 'Selection_999(629).jpg', telephone: '0652251251', email: 'mnl@mobilis.fr', emploi: 'livreur', entrepot: 'Bronis', tournee: -1 },
    { id: 13, trigramme: 'RNI', prenom: 'robert', nom: 'NULI', photo: 'Selection_999(636).jpg', telephone: '0609856325', email: 'rni@mobilis.fr', emploi: 'livreur', entrepot: 'Albis', tournee: -1 },
  ];


  allLivreurs() {
    return this.LIVREURS;
  }

  designerLivreurATournee(id_livreur: number, tournee_id: number) {
    const livreur = this.LIVREURS.find(l => l.id === id_livreur);
    if (livreur) {
      livreur.tournee = tournee_id;  
    }
  }

  getLivreurDeLaTourneeCourante(id_tournee: number) {
    return this.LIVREURS.filter(
      (liv) => liv.tournee === id_tournee
    );
  }
}
