import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewTileService {

  constructor() { }

  private zoomLevelSource = new BehaviorSubject<number>(1);
  zoomLevel$ = this.zoomLevelSource.asObservable();

  setZoomLevel(level: number): void {
    this.zoomLevelSource.next(level);
  }
}
