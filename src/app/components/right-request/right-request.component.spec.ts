import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightRequestComponent } from './right-request.component';

describe('RightRequestComponent', () => {
  let component: RightRequestComponent;
  let fixture: ComponentFixture<RightRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightRequestComponent]
    });
    fixture = TestBed.createComponent(RightRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
