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
  constructor(private viewTileService: ViewTileService ){
  }
  ngOnInit(){
    this.viewTileService.zoomLevel.subscribe((x:any)=>{
      this.panZoomLevel = x;
    })
  }
  zoomOut(){
    this.panZoomLevel =this.panZoomLevel+1
    this.viewTileService.setZoomLevel(this.panZoomLevel);
  }

  zoomIn(){
    if (this.panZoomLevel > 1)
      this.panZoomLevel =this.panZoomLevel-1
    this.viewTileService.setZoomLevel(this.panZoomLevel);
    console.log(this.panZoomLevel)
  }

  resetZoom(){
    this.viewTileService.setZoomLevel(this.defaultZoomLevel);
    this.viewTileService.defaultZoom(true);
  }
}
