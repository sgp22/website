import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'blog-post-page',
  templateUrl: './blog-post-page.component.html'
})
export class BlogPostPageComponent implements OnInit {
  public pageContent: any;
  public loading = true;
  public relatedPosts = [];
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
            this.getAllRelatedPosts(this.pageContent.id);
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

  getAllRelatedPosts(currentPostId) {
    this.relatedPosts = [];
    this.pagesService.getAllBlogPosts()
      .subscribe(res => {
        res['items']
          .filter(blogPost => blogPost.id !== currentPostId)
          .map(item => {
            this.pagesService.getPage(item.id)
              .subscribe(post => {
                this.relatedPosts.push(post);
                this.relatedPosts.sort((a, b) => {
                  return a.meta.first_published_at > b.meta.first_published_at ? -1 : 1;
                });
              })
          });
      });
  }

}
