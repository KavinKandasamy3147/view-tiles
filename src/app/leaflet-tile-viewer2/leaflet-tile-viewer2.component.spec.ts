import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletTileViewer2Component } from './leaflet-tile-viewer2.component';

describe('LeafletTileViewer2Component', () => {
  let component: LeafletTileViewer2Component;
  let fixture: ComponentFixture<LeafletTileViewer2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeafletTileViewer2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeafletTileViewer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
