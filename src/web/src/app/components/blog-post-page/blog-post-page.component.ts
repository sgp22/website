import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'blog-post-page',
  templateUrl: './blog-post-page.component.html',
  providers: [PagesService]
})

export class BlogPostPageComponent implements AfterViewInit {
  public pageContent: any;
  public loading = true;
  public notFound = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private loadingBar: LoadingBarService
  ) { }

  ngAfterViewInit() {

    this.route.url.subscribe(urlSegment => {
      this.loadingBar.start();
      this.pagesService.createPage(this.router.url)
        .subscribe(
          res => {
            this.pageContent = res;
          },
          err => {
            this.loadingBar.complete();
            this.notFound = true;
            this.loading = false;
          },
          () => {
            this.loadingBar.complete();
            this.loading = false;
          }
        );
    });

  }

}
