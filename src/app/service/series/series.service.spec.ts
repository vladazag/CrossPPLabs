import { TestBed } from '@angular/core/testing';

import { SeriesService } from './series.service';

describe('SeriesService', () => {
  let service: SeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Сума ряду значення x = 0, y = 1', () => {
    const xy = service.getTab();
    const y = xy.get('-0.00');
    expect(y).toBeCloseTo(1.000);
  });
});
