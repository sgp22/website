import { QuestionWidgetComponent } from "./question-widget.component";
import { RoleWidgetComponent } from  '../role-widget/role-widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ActivatedRoute } from "../../../../node_modules/@angular/router";
import { DebugElement, NO_ERRORS_SCHEMA } from "../../../../node_modules/@angular/core";
import { Observable } from "../../../../node_modules/rxjs";


describe('QuestionWidgetComponent', () => {

  let component: QuestionWidgetComponent;
  let fixture: ComponentFixture<QuestionWidgetComponent>
  let de: DebugElement;

  let mockActivatedRoute = {
    getData: () => {
      return { subscribe: () => { } }
    }
  }

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [QuestionWidgetComponent, RoleWidgetComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionWidgetComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('#captureHover() should set #widgetHovered to true', () => {
  //   const comp = TestBed.get(QuestionWidgetComponent);
  //   expect(comp.widgetHovered).toBe(false, "false at first");
  //   comp.captureHover();
  //   expect(comp.widgetHovered).toBe(true, "after hovered");
  // });

  // it('should set #widgetHovered to false on page change after ngAfterViewInit', () => {
  //   const comp = TestBed.get(QuestionWidgetComponent);
  //   comp.ngAfterViewInit();
  //   expect(comp.widgetHovered).toBe(false, "on page change");
  // });

});
