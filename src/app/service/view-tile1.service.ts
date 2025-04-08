import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewTileService {

  constructor() { }

  private zoomLevelSource = new BehaviorSubject<number>(1);
  zoomLevel$ = this.zoomLevelSource.asObservable();

  private mapCenterSubject = new BehaviorSubject<{lat: number, lng: number}>({ lat: 65, lng: -50});
  mapCenter$ = this.mapCenterSubject.asObservable();
  
  
  setZoomLevel(level: number): void {
    this.zoomLevelSource.next(level);
  }

  setMapCenter(center: { lat: number, lng: number }) {
    this.mapCenterSubject.next(center);
  }
  
}
