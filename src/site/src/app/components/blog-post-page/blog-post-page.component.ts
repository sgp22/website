import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'blog-post-page',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.css']
})
export class BlogPostPageComponent implements OnInit {
  public pageContent: any;
  public loading = true;
  @HostBinding('class.blog-post--container') blog = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegment => {
      window.scroll(0, 0);
      this.pagesService.createPage(this.router.url)
        .subscribe(
          res => {
            this.pageContent = res;
          },
          err => {
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
    });
  }

}
