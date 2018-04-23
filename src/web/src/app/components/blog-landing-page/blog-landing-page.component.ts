import { Component, OnInit, Input } from '@angular/core';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'blog-landing-page',
  templateUrl: './blog-landing-page.component.html',
  providers: [PagesService]
})

export class BlogLandingPageComponent implements OnInit {
  @Input() page;
  public pageContent: any;
  public posts: any = [];

  constructor(
    private pagesService: PagesService
  ) {}

  ngOnInit() {

    this.pageContent = this.page;

    this.pageContent.meta.children.children.map((post) => {
      this.pagesService.getPage(post.id)
        .subscribe(res => {
          this.posts.push(res);
          this.posts.sort((a, b) => {
            return a.meta.first_published_at > b.meta.first_published_at ? -1 : 1;
          });
        });
    });

  }

}
