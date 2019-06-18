import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewLoaderComponent } from './preview-loader.component';

describe('PreviewLoaderComponent', () => {
  let component: PreviewLoaderComponent;
  let fixture: ComponentFixture<PreviewLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
