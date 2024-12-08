import { TestBed } from '@angular/core/testing';

import { PointCartService } from './point-cart.service';

describe('PointCartService', () => {
  let service: PointCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
