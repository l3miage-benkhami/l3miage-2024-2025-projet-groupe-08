import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor() { }

  geocode(address: string): Promise<{lat: number, lng: number}> {
    const encodedAddress = encodeURIComponent(address);
    const apiUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodedAddress}&limit=1`;

    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Geocoding API request failed');
        }
        return response.json();
      })
      .then((data) => {
        const firstResult = data.features[0];
        if (firstResult) {
          const coordinates = firstResult.geometry.coordinates;
          return {
            lat: coordinates[1], 
            lng: coordinates[0]  
          };
        } else {
          throw new Error('No results found for this address');
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}
