import { QuestionWidgetComponent } from './question-widget.component';
import { RoleWidgetComponent } from '../role-widget/role-widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { DebugElement, NO_ERRORS_SCHEMA } from '../../../../node_modules/@angular/core';
import { Subscription, Observable, of } from 'rxjs';


describe('QuestionWidgetComponent', () => {

  let component: QuestionWidgetComponent;
  let fixture: ComponentFixture<QuestionWidgetComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [QuestionWidgetComponent, RoleWidgetComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ data: 'Test' }) }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('#captureHover() should set #widgetHovered to true', () => {
    expect(component.widgetHovered).toBe(false, 'false at first');
    component.captureHover(event);
    expect(component.widgetHovered).toBe(true, 'after hovered');
  });

  it('should set #widgetHovered to false on page change after ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.widgetHovered).toBe(false, 'after page change');
  });

});
