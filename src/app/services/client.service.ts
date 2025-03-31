import { Injectable } from '@angular/core';
import { CLIENT } from '../data/client.data';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor() { }

  getClient(email: string) {
    return CLIENT.find( client => client.email === email );
  }
}
