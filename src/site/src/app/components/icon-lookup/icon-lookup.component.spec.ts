import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLookupComponent } from './icon-lookup.component';

describe('IconLookupComponent', () => {
  let component: IconLookupComponent;
  let fixture: ComponentFixture<IconLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
