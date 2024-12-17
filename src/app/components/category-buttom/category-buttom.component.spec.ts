import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryButtomComponent } from './category-buttom.component';

describe('CategoryButtomComponent', () => {
  let component: CategoryButtomComponent;
  let fixture: ComponentFixture<CategoryButtomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryButtomComponent]
    });
    fixture = TestBed.createComponent(CategoryButtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
