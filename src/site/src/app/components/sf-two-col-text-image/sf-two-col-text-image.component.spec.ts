import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfTwoColTextImageComponent } from './sf-two-col-text-image.component';

describe('SfTwoColTextImageComponent', () => {
  let component: SfTwoColTextImageComponent;
  let fixture: ComponentFixture<SfTwoColTextImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfTwoColTextImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfTwoColTextImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
