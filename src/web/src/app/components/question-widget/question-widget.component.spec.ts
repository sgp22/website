import { QuestionWidgetComponent } from "./question-widget.component";
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from "../../../../node_modules/@angular/router";
import { Observable } from "../../../../node_modules/rxjs";

class MockActivatedRoute {
  url: '123';
  data = {
    fakeData: 'data'
  };
}

describe('QuestionWidgetComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuestionWidgetComponent,
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        }
      ]
    });
  });

  it('#captureHover() should set #widgetHovered to true', () => {
    const comp = TestBed.get(QuestionWidgetComponent);
    expect(comp.widgetHovered).toBe(false, "false at first");
    comp.captureHover();
    expect(comp.widgetHovered).toBe(true, "after hovered");
  });

  it('should set #widgetHovered to false on page change', () => {
    const comp = TestBed.get(QuestionWidgetComponent);
    // comp.ngAfterViewInit();
    expect(comp.widgetHovered).toBe(false, "on page change");
  });

});
