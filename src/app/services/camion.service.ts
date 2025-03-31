import { Injectable, signal } from '@angular/core';
import { CAMIONS } from '../data/camion.data';
import { single } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CamionService {

  readonly camions = signal(CAMIONS);

  constructor() { }

  getAllCamions() {
    return this.camions();
  }

  designerCamionATournee(code: string, tournee: number) {
      const camion = this.camions().find(camion => camion.code === code);
      if (camion) {
        camion.tournee_id = tournee;  
      }
  }

  getCamionForTournee(tournee_id: number) {
    return this.camions().find(camion => camion.tournee_id === tournee_id);
  }
}
