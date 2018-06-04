import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'feedback-widget',
  templateUrl: './feedback-widget.component.html',
})
export class FeedbackWidgetComponent implements AfterViewInit {
  public maxLength = 1500;
  public charactersLeft = this.maxLength;
  public showAdditional = false;
  public commentSubmitted = false;

  constructor() {}

  ngAfterViewInit() {}

  submitThumb(value: String) {
    if (value === 'thumbs-up') {
      (<any>window).ga('send', 'event', 'feedback', 'clickthumbsup', 'wasthishelpful');
    }
    if (value === 'thumbs-down') {
      (<any>window).ga('send', 'event', 'feedback', 'clickthumbsdown', 'wasthishelpful');
    }
    this.showAdditional = true;
  }

  submitFeedback(e, comment: String) {
    e.preventDefault();
    (<any>window).ga('send', 'event', 'feedback', 'providedfeedback - thumbsup', comment);
    this.showAdditional = false;
    this.commentSubmitted = true;
  }

  characterCounter(comment) {
    if (this.maxLength >= comment.length) {
      this.charactersLeft = (this.maxLength) - (comment.length);
    }
  }
}
