import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfTwoColumnComponent } from './sf-two-column.component';

describe('SfTwoColumnComponent', () => {
  let component: SfTwoColumnComponent;
  let fixture: ComponentFixture<SfTwoColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfTwoColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfTwoColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
