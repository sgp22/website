import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'question-widget',
  templateUrl: './question-widget.component.html'
})
export class QuestionWidgetComponent implements AfterViewInit {
  public widgetHovered = false;
  public url;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit() {
    this.route.url.subscribe(urlSegment => {
      this.widgetHovered = false;
    });
  }

  captureHover(event) {
    (<any>window).ga('send', 'event', 'feedback', 'hover', 'whatisyourrole');
    this.widgetHovered = true;
  }
}
