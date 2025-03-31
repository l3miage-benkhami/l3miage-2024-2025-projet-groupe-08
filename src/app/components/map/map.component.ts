import { Component, computed, input, signal } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, icon, LatLng, latLng, marker, Marker, Polyline, TileLayer, tileLayer } from 'leaflet';
import { AdresseService } from '../../services/adresse.service';
import { CommandesService } from '../../services/commandes.service';
import * as polyline from 'polyline'; 
import { API_KEY } from "./map.data";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})

export class MapComponent {
  currentTournee = input.required<number>();

  private readonly ORS_API_KEY = API_KEY; 

  constructor(
    private adresseService: AdresseService,
    private commandeService: CommandesService,
    private http: HttpClient
  ) {}

  clearPaths() {
    this.layers.set([
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ]);
  }

  public layers = signal<[TileLayer, ...Array<Marker | Polyline>]>([
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
  ]);

  readonly options = signal({
    layers: this.layers(),
    zoom: 12,
    center: latLng(45.189672, 5.72667),
  });

  latLngToMarker(latLng: LatLng): Marker {
    return marker([latLng.lat, latLng.lng], {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    });
  }

  addMarker(adresse: string): void {
    this.adresseService.geocode(adresse).then((e) => {
      const clickedLatLng = new LatLng(e.lat, e.lng);
      const newMarker = this.latLngToMarker(clickedLatLng);
      this.layers.set([...this.layers(), newMarker]);
    });
  }

updateMarkersForCurrentTournee(tournee?: number): void {
  tournee = tournee === undefined ? this.currentTournee() : tournee;
  const commandesPrevues = this.commandeService.getCommandesPrevuesPourTournee(tournee);

  const markerLatLngs: LatLng[] = []; 

  commandesPrevues.forEach((commande) => {
    let adresseCommande = this.commandeService.getAdresseOfCommande(commande.référence);
    this.adresseService.geocode(adresseCommande).then((e) => {
      const clickedLatLng = new LatLng(e.lat, e.lng);
      const newMarker = this.latLngToMarker(clickedLatLng);

      this.layers.update(() => [...this.layers(), newMarker]);
      markerLatLngs.push(clickedLatLng); 

      if (markerLatLngs.length > 1) {
        const from = markerLatLngs[markerLatLngs.length - 2]; 
        const to = markerLatLngs[markerLatLngs.length - 1];   
        this.drawRoute(from, to, this.generateDarkDistinctColor(tournee)); 
      }
    });
  });
}

  updateMarkersForAllTournee() {
    for(let i = 0; i <= 6; i++) {
      this.updateMarkersForCurrentTournee(i);
    }
  }

  generateDarkDistinctColor(tournee: number): string {
    const id = tournee % 6; 

    const r = Math.max(50, (id * 40) + 50);
    const g = Math.max(50, (id * 60) + 50); 
    const b = Math.max(50, (id * 80) + 50); 

    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).substr(1)}`;
  }



  async drawRoute(from: LatLng, to: LatLng, color?: string): Promise<void> {
      const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
        method: 'POST',
        headers: {
          'Authorization': this.ORS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: [[from.lng, from.lat], [to.lng, to.lat]], 
        }),
      });

      const data = await response.json();
      const decodedPolyline = polyline.decode(data.routes[0].geometry); 
  const routeCoordinates = decodedPolyline.map((coords) => {
    const [lat, lng] = coords as [number, number]; 
    return new LatLng(lat, lng);
  });

    const routePolyline = new Polyline(routeCoordinates, { color: color === undefined ?  "blue" : color, weight: 5 });
    this.layers.set([...this.layers(), routePolyline]); 
  }

  async drawRouteBetweenAddresses(adresse1: string, adresse2: string): Promise<void> {
    const location1 = await this.adresseService.geocode(adresse1);
    const location2 = await this.adresseService.geocode(adresse2);

    const from = new LatLng(location1.lat, location1.lng);
    const to = new LatLng(location2.lat, location2.lng);

    this.drawRoute(from, to);
  }
}
