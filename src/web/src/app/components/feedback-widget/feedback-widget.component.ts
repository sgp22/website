import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    if(this.route.url) {
      this.route.url.subscribe(urlSegment => {
        this.thumbsDown.nativeElement.checked = false;
        this.thumbsUp.nativeElement.checked = false;
        this.showAdditional = false;
        this.widgetHovered = false;
        this.url = this.router.routerState.snapshot.url;
      });
    }
  }

  captureHover(e) {
    try {
      (<any>window).ga('send', 'event', 'feedback-wasthishelpful', 'uniquehover', this.url);
    } catch(error) {
      console.error(error);
    }
    this.widgetHovered = true;
  }

  submitThumb(value: String) {
    this.thumbValue = value;
    if (this.thumbValue === 'thumbs-up') {
      try {
        (<any>window).ga('send', 'event', 'feedback-wasthishelpful', 'clickthumbsup', this.url);
      } catch(error) {
        console.error(error);
      }
    }
    if (this.thumbValue === 'thumbs-down') {
      try {
        (<any>window).ga('send', 'event', 'feedback-wasthishelpful', 'clickthumbsdown', this.url);
      } catch(error) {
        console.error(error);
      }
    }
    this.showAdditional = true;
  }

  submitFeedback(e, comment: String) {
    e.preventDefault();
    if (comment === '') {
      return;
    }
    try {
      (<any>window).ga('send', 'event', 'feedback-wasthishelpful', `providedfeedback - ${this.thumbValue}`, comment);
    } catch(error) {
      console.error(error);
    }
    this.showAdditional = false;
    this.commentSubmitted = true;
  }

  characterCounter(comment) {
    if (this.maxLength >= comment.length) {
      this.charactersLeft = (this.maxLength) - (comment.length);
    }
  }
}
