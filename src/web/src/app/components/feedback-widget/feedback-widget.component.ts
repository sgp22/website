import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'feedback-widget',
  templateUrl: './feedback-widget.component.html',
})
export class FeedbackWidgetComponent implements AfterViewInit {
  public maxLength = 1500;
  public charactersLeft = this.maxLength;

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

  characterCounter(comment) {
    if(this.maxLength >= comment.length) {
      this.charactersLeft = (this.maxLength) - (comment.length);
    }
  }
}
