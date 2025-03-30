import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewTileService {

  constructor() { }

  private zoom = new BehaviorSubject<number>(5);
  zoomLevel = this.zoom.asObservable();

  private zoomSubject = new BehaviorSubject<boolean>(false); 
  zoomLevel$ = this.zoomSubject.asObservable();
  setZoomLevel(value: number){
    this.zoom.next(value);
  }

  defaultZoom(value: boolean){
    this.zoomSubject.next(value)
  }
}
