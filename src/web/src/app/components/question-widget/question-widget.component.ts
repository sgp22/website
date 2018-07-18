import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'question-widget',
  templateUrl: './question-widget.component.html'
})
export class QuestionWidgetComponent implements AfterViewInit {
  public widgetHovered = false;
  public url;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit() {
    this.url = this.route.url;
    this.url.subscribe(urlSegment => {
      this.widgetHovered = false;
    });
  }

  captureHover(event) {
    try {
      (<any>window).ga('send', 'event', 'feedback', 'hover', 'whatisyourrole');
    } catch(error) {
      console.error(error);
    }
    this.widgetHovered = true;
  }
}
