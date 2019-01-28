import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionWidgetComponent } from './question-widget.component';

describe('QuestionWidgetComponent', () => {
  let component: QuestionWidgetComponent;
  let fixture: ComponentFixture<QuestionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
