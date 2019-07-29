import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blog-posts',
  template: `
    <div class="blog-post--related-posts--feed--inner">
      <article *ngFor="let post of posts; let i = index;" class="blog-post--preview blog-post--preview--related">
        <a class="blog-post--link" [routerLink]="['/blog', post.meta.slug]">

          <header *ngIf="post.hero_image !== null" class="blog-post--header"
            [ngStyle]="{'background-image': 'url(' + post.hero_image.meta.download_url + ')'}">
          </header>

          <header *ngIf="post.hero_image === null" class="blog-post--header"
            [ngStyle]="{'background-image': 'url(assets/img/placeholder-01.jpg)'}">
          </header>

          <div class="blog-post--content">
            <span class="blog-post--meta">
              <time class="blog-post--date">{{post.meta.first_published_at | date: 'MMMM d, yyyy'}}</time>
              <span>|</span>
              <span *ngIf="post.author" class="blog-post--author">{{post.author}}</span>
              <span *ngIf="!post.author" class="blog-post--author">IDS Team</span>
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
export class BlogPostsComponent implements OnInit {
  @Input() posts: any;

  constructor() { }

  ngOnInit() {
  }

}
