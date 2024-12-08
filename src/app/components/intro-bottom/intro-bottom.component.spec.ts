import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroBottomComponent } from './intro-bottom.component';

describe('IntroBottomComponent', () => {
  let component: IntroBottomComponent;
  let fixture: ComponentFixture<IntroBottomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroBottomComponent]
    });
    fixture = TestBed.createComponent(IntroBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
