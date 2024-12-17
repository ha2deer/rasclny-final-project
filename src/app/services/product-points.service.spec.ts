import { TestBed } from '@angular/core/testing';

import { ProductPointsService } from './product-points.service';

describe('ProductPointsService', () => {
  let service: ProductPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
