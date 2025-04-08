import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ViewTileService } from '../service/view-tile1.service';

@Component({
  selector: 'app-leaflet-tile-viewer',
  templateUrl: './leaflet-tile-viewer.component.html',
  styleUrls: ['./leaflet-tile-viewer.component.css']
})
export class LeafletTileViewerComponent implements OnInit,AfterViewInit {
  map: any;
  internalUpdate: boolean = false;
  constructor(private sharedService: ViewTileService){}
  ngAfterViewInit(): void {
    this.tileInit();
  }
  ngOnInit() {
  }

  tileInit(){
    const mapContainer = document.getElementById('map-a');
    this.map = L.map("map-a",{
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false, // disable built-in zoom
    }).setView([65, -50], 1);

    L.tileLayer("http://3.13.59.127/colo-a-l1/{z}/{x}/{y}.png", {
      tileSize: 256,
      minZoom: 0,
      maxZoom: 5,
      noWrap: true,
      
    }).addTo(this.map);
    this.map.getContainer().addEventListener('wheel', (event: WheelEvent) => {
      event.preventDefault();

      const currentZoom = this.map.getZoom();
      const delta = event.deltaY > 0 ? -1 : 1;
      const newZoom = currentZoom + delta;
      const minZoom = 1;
      const maxZoom = 5;

      if (newZoom >= minZoom && newZoom <= maxZoom) {
        this.internalUpdate = true;
        this.map.setZoom(newZoom);
        this.sharedService.setZoomLevel(newZoom);
      }
    });

    this.sharedService.zoomLevel$.subscribe((zoomLevel) => {
      if (this.map.getZoom() !== zoomLevel) {
        if (!this.internalUpdate) {
          this.map.setZoom(zoomLevel);
        }
        this.internalUpdate = false;
      }
    });

  this.map.on('moveend', () => {
    const center = this.map.getCenter(); // {lat, lng}
    this.internalUpdate = true;
    this.sharedService.setMapCenter(center); // pass center to shared service
  });

  this.sharedService.mapCenter$.subscribe((center) => {
    const currentCenter = this.map.getCenter();
    if (!this.internalUpdate &&
        (currentCenter.lat !== center.lat || currentCenter.lng !== center.lng)) {
      this.map.setView(center);
    }
    this.internalUpdate = false;
  });
  }
}
