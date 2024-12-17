import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPointsComponent } from './product-points.component';

describe('ProductPointsComponent', () => {
  let component: ProductPointsComponent;
  let fixture: ComponentFixture<ProductPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPointsComponent]
    });
    fixture = TestBed.createComponent(ProductPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
