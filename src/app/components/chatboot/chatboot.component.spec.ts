import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbootComponent } from './chatboot.component';

describe('ChatbootComponent', () => {
  let component: ChatbootComponent;
  let fixture: ComponentFixture<ChatbootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatbootComponent]
    });
    fixture = TestBed.createComponent(ChatbootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
