import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamfieldsComponent } from './streamfields.component';

describe('StreamfieldsComponent', () => {
  let component: StreamfieldsComponent;
  let fixture: ComponentFixture<StreamfieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamfieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
