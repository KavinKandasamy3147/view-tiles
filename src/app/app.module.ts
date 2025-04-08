import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { LeafletTileViewerComponent } from './leaflet-tile-viewer/leaflet-tile-viewer.component';
import { LeafletTileViewer2Component } from './leaflet-tile-viewer2/leaflet-tile-viewer2.component';

@NgModule({
  declarations: [
    AppComponent,
    LeafletTileViewerComponent,
    LeafletTileViewer2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
