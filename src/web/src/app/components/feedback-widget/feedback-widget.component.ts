import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../shared/feedback.service';
import { NgForm } from '@angular/forms';

interface FeedbackForm {
  comment: string;
  userEmail: string;
}

@Component({
  selector: 'feedback-widget',
  templateUrl: './feedback-widget.component.html',
  providers: [FeedbackService]
})
export class FeedbackWidgetComponent implements AfterViewInit {
  @ViewChild('thumbsDown') thumbsDown: ElementRef;
  @ViewChild('thumbsUp') thumbsUp: ElementRef;
  @ViewChild('feedbackForm') feedbackForm: NgForm;
  @Input() notFound;
  public widgetHovered = false;
  public thumbValue;
  public maxLength = 1500;
  public charactersLeft = this.maxLength;
  public showAdditional = false;
  public commentSubmitted = false;
  public userEmail = '';
  public comment = '';
  public url;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private feedbackSerice: FeedbackService
  ) {}

  ngAfterViewInit() {
    if (this.route.url) {
      this.route.url.subscribe(urlSegment => {
        this.thumbsDown.nativeElement.checked = false;
        this.thumbsUp.nativeElement.checked = false;
        this.showAdditional = false;
        this.widgetHovered = false;
        this.commentSubmitted = false;
        this.url = this.router.routerState.snapshot.url;
      });
    }
  }

  captureHover(e) {
    try {
      (<any>window).ga('send', 'event', 'feedback-wasthishelpful', 'uniquehover', this.url);
    } catch (error) {
      console.error(error);
    }
    this.widgetHovered = true;
  }

  submitThumb(value: String) {
    this.thumbValue = value;
    this.addThumbs(this.thumbValue);
    if (this.thumbValue === 'thumbs-up') {
      try {
        (<any>window).ga('send', 'event', 'feedback-wasthishelpful', 'clickthumbsup', this.url);
      } catch (error) {
        console.error(error);
      }
    }
    if (this.thumbValue === 'thumbs-down') {
      try {
        (<any>window).ga('send', 'event', 'feedback-wasthishelpful', 'clickthumbsdown', this.url);
      } catch (error) {
        console.error(error);
      }
    }
    this.showAdditional = true;
  }

  submitFeedback(formValue: FeedbackForm) {
    if (this.feedbackForm.valid) {
      try {
        (<any>window).ga(
            'send',
            'event', 'feedback-wasthishelpful',
            `providedfeedback - ${this.thumbValue}`,
            formValue.comment
          );
        if (formValue.userEmail) {
          (<any>window).ga(
              'send',
              'event',
              'feedback - wasthishelpful',
              `providedemail - ${this.thumbValue}`,
              formValue.comment,
              { 'dimension9': formValue.userEmail }
            );
        }
      } catch (error) {
        console.error(error);
      }
      this.feedbackForm.reset();
      this.showAdditional = false;
      this.commentSubmitted = true;
    }
  }

  addThumbs(thumb_type) {
    if (thumb_type === 'thumbs-up') {
      this.feedbackSerice.addThumb({ relative_url: this.url, thumb_type: 'thumbs_up' });
    }
    if (thumb_type === 'thumbs-down') {
      this.feedbackSerice.addThumb({ relative_url: this.url, thumb_type: 'thumbs_down' });
    }
  }

  getThumbs(id: number) {
    console.log(this.url);
  }

  characterCounter(comment) {
    if (this.maxLength >= comment.length) {
      this.charactersLeft = (this.maxLength) - (comment.length);
    }
  }
}
