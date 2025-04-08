import { Component, OnInit } from '@angular/core';
import { ViewTileService } from './service/view-tile1.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  panZoomLevel!:number;
  defaultZoomLevel=5;
  dragReset={ lat: 65, lng: -50}
  constructor(private viewTileService: ViewTileService ){
  }
  ngOnInit(){
    this.viewTileService.zoomLevel$.subscribe((x:any)=>{
      this.panZoomLevel = x;
    })
  }

  zoomOut(){
    this.panZoomLevel =this.panZoomLevel-1
    this.viewTileService.setZoomLevel(this.panZoomLevel);
  }

  zoomIn(){
      this.panZoomLevel =this.panZoomLevel+1
    this.viewTileService.setZoomLevel(this.panZoomLevel);
    console.log(this.panZoomLevel)
  }

  resetZoom(){
    this.viewTileService.setMapCenter(this.dragReset);
    this.viewTileService.setZoomLevel(1);
  }
}
