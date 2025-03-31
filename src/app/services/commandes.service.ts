import { Injectable, signal } from '@angular/core';
import { COMMANDES } from '../data/commandes.data';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})

export class CommandesService {
  constructor(private clientService: ClientService) {}

  commandes = signal(COMMANDES);

  commandesPrevues() {
    return this.commandes().filter(
      commande => commande.tournee_id >= 0
    );
  }

  commandesOuvertes() {
    return this.commandes().filter(
      commande => commande.tournee_id < 0
    );
  }

  getCommandesPrevuesPourTournee(id: number) {
    return this.commandesPrevues().filter(c => c.tournee_id === id);
  }

  ajouteCommandeDansTournee(référence: string, id_tournee: number) {
    const updatedCommandes = this.commandes().map(commande =>
      commande.référence === référence
        ? { ...commande, tournee_id: id_tournee }
        : commande
    );
    this.commandes.update(() => updatedCommandes);
  }

  getAdresseOfCommande(commandeRef: string): string {
    let emailClient = this.commandes().find(c => c.référence === commandeRef)!.client;
    let client =  this.clientService.getClient(emailClient);
    return client?.adresse + " " + client?.['code postal'] + " " + client?.ville;
  }
}
