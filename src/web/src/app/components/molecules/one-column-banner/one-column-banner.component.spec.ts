import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneColumnBannerComponent } from './one-column-banner.component';

describe('OneColumnBannerComponent', () => {
  let component: OneColumnBannerComponent;
  let fixture: ComponentFixture<OneColumnBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneColumnBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneColumnBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
