import { Component, signal } from '@angular/core';
import { CommandesComponent } from "./components/commandes/commandes.component";
import { MapComponent } from "./components/map/map.component";
import { TourneeService } from './services/tournee.service';
import { TourneeComponent } from "./components/tournee/tournee.component";
import { LivreurService } from './services/livreur.service';
import { CommonModule } from '@angular/common'; 
import { CamionService } from './services/camion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommandesComponent, MapComponent, TourneeComponent, CommonModule]
})

export class AppComponent {
    currentTournee = signal(-1);
    commandToBeShown = signal(-1);
    selectingLivreur = signal(false);
    selectingCamion = signal(false);
    loggedIn = signal(false);

    constructor(private tourneeService: TourneeService, 
                private livreurService: LivreurService, 
                private camionService: CamionService) {}

    allCamion() {
        return this.camionService.getAllCamions();
    }

    toggleLoggedIn() {
        this.loggedIn.set(!this.loggedIn());
    }

    toggleSelectingCamion() {
        this.selectingCamion.set(!this.selectingCamion());
    }

    selectTournee(id: number) {
        this.currentTournee.set(id);
    }

    allTournee() {
        return this.tourneeService.getAllTournee();
    }

    resetTournee() {
        this.currentTournee.set(-1);
    }

    setCommandToBeShown(id: number) {
        this.commandToBeShown.set(id);
    }

    ajouterTournee() {
        this.tourneeService.ajouterTournee();
    }

    toggleSelectingLivreur() {
        this.selectingLivreur.set( !this.selectingLivreur() );
    }

    designerLivreurATournee(id: number) {
        this.livreurService.designerLivreurATournee(id, this.currentTournee());
    }

    allLivreurs() {
        return this.livreurService.allLivreurs();
    }

    getLivreurDeLaTourneeCourante() {
        return this.livreurService.getLivreurDeLaTourneeCourante(this.currentTournee());
    }

    designerCamionATournee(code: string) {
        this.camionService.designerCamionATournee(code, this.currentTournee());
    }

    camionPourTournee() {
        return this.camionService.getCamionForTournee(this.currentTournee());
    }
}
