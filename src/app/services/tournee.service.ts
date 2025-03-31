import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TourneeService {

  constructor() { }

  tournees: { id: number }[] = [];

  ajouterTournee() {
    const newId = this.tournees.length > 0 
      ? this.tournees[this.tournees.length - 1].id + 1 
      : 1;  

    this.tournees.push({ id: newId });  
  }


  getAllTournee() {
    return this.tournees;
  }
}
