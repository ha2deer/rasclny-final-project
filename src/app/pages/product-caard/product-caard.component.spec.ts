import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCAardComponent } from './product-caard.component';

describe('ProductCAardComponent', () => {
  let component: ProductCAardComponent;
  let fixture: ComponentFixture<ProductCAardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCAardComponent]
    });
    fixture = TestBed.createComponent(ProductCAardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
