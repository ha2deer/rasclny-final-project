import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBottomComponent } from './home-bottom.component';

describe('HomebottomComponent', () => {
  let component: HomeBottomComponent;
  let fixture: ComponentFixture<HomeBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBottomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
