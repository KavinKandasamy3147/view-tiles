import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTile2Component } from './view-tile2.component';

describe('ViewTile2Component', () => {
  let component: ViewTile2Component;
  let fixture: ComponentFixture<ViewTile2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTile2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
