import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { CommandesService } from '../../services/commandes.service';

@Component({
  selector: 'app-commandes',
  imports: [],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.css'
})

export class CommandesComponent {
  @Input() tourneeId!: number;

  constructor(public commandesService: CommandesService) {}

  getCommandesPrevuesForTournee() {
    return this.commandesService.getCommandesPrevuesPourTournee(this.tourneeId);
  }

  selectedCommande(refCommande: string) {
    this.commandesService.ajouteCommandeDansTournee(refCommande, this.tourneeId);
  }

  getCommandesOuvertes() {
    return this.commandesService.commandesOuvertes();
  }

}
