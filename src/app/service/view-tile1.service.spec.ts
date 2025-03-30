import { TestBed } from '@angular/core/testing';

import { ViewTile1Service } from './view-tile1.service';

describe('ViewTile1Service', () => {
  let service: ViewTile1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTile1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
