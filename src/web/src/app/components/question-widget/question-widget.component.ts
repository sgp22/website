import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'question-widget',
  templateUrl: './question-widget.component.html'
})
export class QuestionWidgetComponent implements AfterViewInit {
  public widgetHovered = false;

  constructor() { }

  ngAfterViewInit() { }

  captureHover(event) {
    (<any>window).ga('send', 'event', 'feedback', 'hover', 'whatisyourrole');
    this.widgetHovered = true;
  }

}
