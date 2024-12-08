import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatButtonComponent } from './cat-button.component';

describe('CatButtonComponent', () => {
  let component: CatButtonComponent;
  let fixture: ComponentFixture<CatButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatButtonComponent]
    });
    fixture = TestBed.createComponent(CatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
