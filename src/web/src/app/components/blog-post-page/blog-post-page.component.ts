import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blog-post-page',
  templateUrl: './blog-post-page.component.html',
})

export class BlogPostPageComponent implements OnInit {
  @Input() page;
  public pageContent: any;

  constructor() { }

  ngOnInit() {

    this.pageContent = this.page;

  }

}
