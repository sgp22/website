import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'blog-landing-page',
  templateUrl: './blog-landing-page.component.html',
  providers: [PagesService]
})

export class BlogLandingPageComponent implements AfterViewInit {
  public pageContent: any;
  public notFound = false;
  public posts: any = [];

  constructor(
    private router: Router,
    private pagesService: PagesService,
    private loadingBar: LoadingBarService
  ) {}

  ngAfterViewInit() {

    this.renderPage();

  }

  private renderPage() {
    this.loadingBar.start();
    this.pagesService.createPage(this.router.url)
      .subscribe(
        res => {
          this.pageContent = res;
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
                }
              );
          });
        },
        err => {
          this.loadingBar.complete();
          this.notFound = true;
        },
        () => {
          this.loadingBar.complete();
        }
      )
  }

}
