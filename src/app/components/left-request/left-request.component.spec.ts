import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftRequestComponent } from './left-request.component';

describe('LeftRequestComponent', () => {
  let component: LeftRequestComponent;
  let fixture: ComponentFixture<LeftRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftRequestComponent]
    });
    fixture = TestBed.createComponent(LeftRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
