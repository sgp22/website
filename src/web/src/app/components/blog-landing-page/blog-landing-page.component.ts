import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blog-landing-page',
  templateUrl: './blog-landing-page.component.html',
})

export class BlogLandingPageComponent implements OnInit {
  @Input() page;
  public pageContent: any;

  constructor() {}

  ngOnInit() {
    this.pageContent = this.page;
  }

}
