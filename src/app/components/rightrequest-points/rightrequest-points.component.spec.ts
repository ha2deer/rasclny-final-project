import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightrequestPointsComponent } from './rightrequest-points.component';

describe('RightrequestPointsComponent', () => {
  let component: RightrequestPointsComponent;
  let fixture: ComponentFixture<RightrequestPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightrequestPointsComponent]
    });
    fixture = TestBed.createComponent(RightrequestPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
