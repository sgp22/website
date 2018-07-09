import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'feedback-widget',
  templateUrl: './feedback-widget.component.html',
})
export class FeedbackWidgetComponent implements AfterViewInit {
  @ViewChild('thumbsDown') thumbsDown: ElementRef;
  @ViewChild('thumbsUp') thumbsUp: ElementRef;
  @Input() notFound;
  public widgetHovered = false;
  public thumbValue;
  public maxLength = 1500;
  public charactersLeft = this.maxLength;
  public showAdditional = false;
  public commentSubmitted = false;
  public url;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.route.url.subscribe(urlSegment => {
      this.thumbsDown.nativeElement.checked = false;
      this.thumbsUp.nativeElement.checked = false;
      this.showAdditional = false;
      this.widgetHovered = false;
      this.url = this.router.routerState.snapshot.url;
    });
  }

  captureHover(e) {
    (<any>window).ga('send', 'event', 'feedback-wasthishelpful', 'uniquehover', this.url);
    this.widgetHovered = true;
  }

  submitThumb(value: String) {
    this.thumbValue = value;
    if (this.thumbValue === 'thumbs-up') {
      (<any>window).ga('send', 'event', 'feedback-wasthishelpful', 'clickthumbsup', this.url);
    }
    if (this.thumbValue === 'thumbs-down') {
      (<any>window).ga('send', 'event', 'feedback-wasthishelpful', 'clickthumbsdown', this.url);
    }
    this.showAdditional = true;
  }

  submitFeedback(e, comment: String) {
    e.preventDefault();
    if (comment === '') {
      return;
    }
    (<any>window).ga('send', 'event', 'feedback-wasthishelpful', `providedfeedback - ${this.thumbValue}`, comment);
    this.showAdditional = false;
    this.commentSubmitted = true;
  }

  characterCounter(comment) {
    if (this.maxLength >= comment.length) {
      this.charactersLeft = (this.maxLength) - (comment.length);
    }
  }
}
