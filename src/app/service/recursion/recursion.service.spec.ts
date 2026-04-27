import { TestBed } from '@angular/core/testing';

import { RecursionService } from './recursion.service';

describe('RecursionService', () => {
  let service: RecursionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Сума ряду за допомогою рекурсії значення x = 0, y = 1', () => {
    const xy = service.getTab();
    const y = xy.get('-0.00');
    expect(y).toBeCloseTo(1.000);
  });
});
