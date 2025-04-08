import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletTileViewerComponent } from './leaflet-tile-viewer.component';

describe('LeafletTileViewerComponent', () => {
  let component: LeafletTileViewerComponent;
  let fixture: ComponentFixture<LeafletTileViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeafletTileViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeafletTileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
