import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'medium-posts',
  template: `
    <div class="blog-post--related-posts--feed--inner">
      <article *ngFor="let post of posts; let i = index;" class="blog-post--preview blog-post--preview--related">
        <a class="blog-post--link" href="{{post.link}}" target="_blank">

          <header *ngIf="post.thumbnail !== null" class="blog-post--header"
            [ngStyle]="{'background-image': 'url(' + post.thumbnail + ')'}">
          </header>

          <div class="blog-post--content">
            <span class="blog-post--meta">
              <time class="blog-post--date">{{post.pubDate | date: 'MMMM d, yyyy'}}</time> |
              <span class="blog-post--author">{{post.author}}</span>
            </span>
            <h1 class="blog-post--title">{{post.title}}</h1>
            <span class="blog-post--readmore">Read More <svg class="ids-icon"><use xlink:href="#icon-drilldown"/></svg></span>
          </div>
        </a>
      </article>
    </div>
  `,
  styles: [':host { width: 100% }']
})
export class MediumPostsComponent implements OnInit {
  @Input() posts: any;

  constructor() { }

  ngOnInit() {
  }

}
