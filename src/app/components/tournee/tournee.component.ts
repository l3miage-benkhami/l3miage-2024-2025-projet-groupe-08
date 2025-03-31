import { Component, Input } from '@angular/core';
import { CommandesService } from '../../services/commandes.service';

@Component({
  selector: 'app-tournee',
  imports: [],
  templateUrl: './tournee.component.html',
  styleUrl: './tournee.component.css'
})
export class TourneeComponent {
  @Input() tourneeId!: number;

    constructor(private serviceCommandes: CommandesService){}
    
    getCommandesPourCurrentTournee() {
      return this.serviceCommandes.getCommandesPrevuesPourTournee(this.tourneeId);
    }

    getAdresseOfCommande(commandeRef: string) {
      return this.serviceCommandes.getAdresseOfCommande(commandeRef);
    }
}
