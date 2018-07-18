import { QuestionWidgetComponent } from "./question-widget.component";
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from "../../../../node_modules/@angular/router";
import { Observable } from "../../../../node_modules/rxjs";

describe('QuestionWidgetComponent', () => {

  beforeEach(async() => {

    TestBed.configureTestingModule({
      providers: [
        QuestionWidgetComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            params: {
                subscribe: function() {
                console.log('Subscribed.');
                Observable.of({ id: 123 });
              }
            }
          }
        }
      ],
    });
  });

  it('#captureHover() should set #widgetHovered to true', () => {
    const comp = TestBed.get(QuestionWidgetComponent);
    expect(comp.widgetHovered).toBe(false, "false at first");
    comp.captureHover();
    expect(comp.widgetHovered).toBe(true, "after hovered");
  });

  it('should set #widgetHovered to false on page change after ngAfterViewInit', () => {
    const comp = TestBed.get(QuestionWidgetComponent);
    comp.ngAfterViewInit();
    expect(comp.widgetHovered).toBe(false, "on page change");
  });

});
