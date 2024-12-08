import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPointComponent } from './request-point.component';

describe('RequestPointComponent', () => {
  let component: RequestPointComponent;
  let fixture: ComponentFixture<RequestPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestPointComponent]
    });
    fixture = TestBed.createComponent(RequestPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
