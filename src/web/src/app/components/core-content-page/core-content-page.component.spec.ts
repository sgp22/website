import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreContentPageComponent } from './core-content-page.component';

describe('CoreContentPageComponent', () => {
  let component: CoreContentPageComponent;
  let fixture: ComponentFixture<CoreContentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreContentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
