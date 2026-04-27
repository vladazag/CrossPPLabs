import { TestBed } from '@angular/core/testing';

import { TabService } from './tab.service';

describe('TabService', () => {
  let service: TabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Табуляція значення x = 0, y = 1', () => {
    const xy = service.getTab();
    const y = xy.y[xy.x.indexOf('0.00')];
    expect(y).toBeCloseTo(1.000);
  })
});
