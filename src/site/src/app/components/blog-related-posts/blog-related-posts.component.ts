import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blog-related-posts',
  templateUrl: './blog-related-posts.component.html',
  styleUrls: ['./blog-related-posts.component.scss']
})
export class BlogRelatedPostsComponent implements OnInit {
  @Input() title: string;
  @Input() eyebrow: string;
  @Input() isExternal: boolean;

  constructor() { }

  ngOnInit() {
  }

}
