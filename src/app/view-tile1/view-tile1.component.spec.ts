import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTile1Component } from './view-tile1.component';

describe('ViewTile1Component', () => {
  let component: ViewTile1Component;
  let fixture: ComponentFixture<ViewTile1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTile1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTile1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
