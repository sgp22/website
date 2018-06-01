import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'feedback-widget',
  templateUrl: './feedback-widget.component.html',
})
export class FeedbackWidgetComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {}

  submitThumb(value: String) {
    if (value === 'thumbs-up') {
      (<any>window).ga('send', 'event', 'feedback', 'clickthumbsup', 'wasthishelpful');
    }
    if (value === 'thumbs-down') {
      (<any>window).ga('send', 'event', 'feedback', 'clickthumbsdown', 'wasthishelpful');
    }
  }

  submitFeedback(e, comment: String) {
    e.preventDefault();
    (<any>window).ga('send', 'event', 'feedback', 'providedfeedback - thumbsup', comment);
  }
}
