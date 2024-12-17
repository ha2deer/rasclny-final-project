import { TestBed } from '@angular/core/testing';
import { SingleCategoryService } from '../services/singleCategory.service';
 // Ensure this matches the service file name

describe('ProductService', () => {
  let service: SingleCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});