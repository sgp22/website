import { FeedbackWidgetComponent } from './feedback-widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { DebugElement, NO_ERRORS_SCHEMA } from '../../../../node_modules/@angular/core';
import { Observable } from '../../../../node_modules/rxjs';


describe('FeedbackWidgetComponent', () => {

  let component: FeedbackWidgetComponent;
  let fixture: ComponentFixture<FeedbackWidgetComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [FeedbackWidgetComponent],
      imports: [],
      providers: [
        {
          provide: Router
        },
        {
          provide: ActivatedRoute,
          useValue: { data: Observable.of( { data: 'Test' } ) }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#captureHover() should set #widgetHovered to true', () => {
    expect(component.widgetHovered).toBe(false, 'false at first');
    component.captureHover(event);
    expect(component.widgetHovered).toBe(true, 'after hovered');
  });

  it('should set #widgetHovered and #showAdditional to false on page change after ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.widgetHovered).toBe(false, 'after page change');
    expect(component.showAdditional).toBe(false, 'after page change');
  });

  it('should set #thumbsup and #thumbsdown to unchecked on page change after ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.thumbsDown.nativeElement.checked).toBe(false, 'after page change');
    expect(component.thumbsUp.nativeElement.checked).toBe(false, 'after page change');
  });

  it('should set #url to current page url after ngAfterViewInit', () => {
    component.ngAfterViewInit();
    component.url = 'test';
    expect(component.url).toEqual('test');
  });

  it('#submitThumb() should set the value of #thumbValue', () => {
    const value = 'test-value';
    component.submitThumb(value);
    expect(component.thumbValue).toEqual(value);
  });

  it('#submitFeedback should set #showAdditional to false and #commentSubmitted to true', () => {
    const formValue = {comment: 'test comment', email: 'test@email.com'};
    const e = { preventDefault: function () { } };
    component.submitFeedback(formValue);
    expect(component.showAdditional).toBe(false, 'after submit');
    expect(component.commentSubmitted).toBe(true, 'after submit');
  });

});
