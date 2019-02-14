import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FeedbackWidgetService } from './feedback-widget.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

interface FeedbackForm {
  comment: string;
  userEmail: string;
}

@Component({
  selector: 'feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.scss']
})
export class FeedbackWidgetComponent implements OnInit {
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
  public displayThumbsUp = '';
  public displayThumbsDown = '';
  public displayTotal = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private feedbackService: FeedbackWidgetService
  ) { }

  ngOnInit() {
    if (this.route.url) {
      this.route.url.subscribe(urlSegment => {
        this.thumbsDown.nativeElement.checked = false;
        this.thumbsUp.nativeElement.checked = false;
        this.showAdditional = false;
        this.widgetHovered = false;
        this.commentSubmitted = false;
        this.url = this.router.routerState.snapshot.url;
        this.getThumbs(this.url);
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
      this.feedbackService
        .addThumb({ relative_url: this.url, thumb_type: 'thumbs_up' })
        .subscribe(val => { this.getThumbs(this.url); });
    }
    if (thumb_type === 'thumbs-down') {
      this.feedbackService
        .addThumb({ relative_url: this.url, thumb_type: 'thumbs_down' })
        .subscribe(val => { this.getThumbs(this.url); });
    }
  }

  getThumbs(relative_url) {
    this.feedbackService.getThumbsByPage(relative_url)
      .subscribe(res => {
        this.displayThumbsDown = res['thumbs_down'];
        this.displayThumbsUp = res['thumbs_up'];
        this.displayTotal = res['total'];
      });
  }

  characterCounter(comment) {
    if (this.maxLength >= comment.length) {
      this.charactersLeft = (this.maxLength) - (comment.length);
    }
  }

}
