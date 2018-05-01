import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'blog-landing-page',
  templateUrl: './blog-landing-page.component.html',
  providers: [PagesService]
})

export class BlogLandingPageComponent implements AfterViewInit {
  public pageContent: any;
  public posts: any = [];
  public loading = true;

  constructor(
    private router: Router,
    private pagesService: PagesService
  ) {}

  ngAfterViewInit() {

    const url = this.router.url;
    const urlSegments = url.split('/');
    const slug = urlSegments.slice(-1)[0];

    this.pagesService.getCurrentPage(slug)
      .subscribe(res => {
        this.pageContent = res
        this.pageContent.meta.children.children.map((post) => {
          this.pagesService.getPage(post.id)
            .subscribe(
              (res) => {
                this.posts.push(res);
                this.posts.sort((a, b) => {
                  return a.meta.first_published_at > b.meta.first_published_at ? -1 : 1;
                });
              },
              (err) => {
                console.error(err);
              },
              () => {
                this.loading = false;
              }
            );
        });
      });

  }

}
