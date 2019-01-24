import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfFullWidthComponent } from './sf-full-width.component';

describe('SfFullWidthComponent', () => {
  let component: SfFullWidthComponent;
  let fixture: ComponentFixture<SfFullWidthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfFullWidthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfFullWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
