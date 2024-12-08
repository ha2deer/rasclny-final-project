import { TestBed } from '@angular/core/testing';

import { FinalSingelProductService } from './final-singel-product.service';

describe('FinalSingelProductService', () => {
  let service: FinalSingelProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalSingelProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
