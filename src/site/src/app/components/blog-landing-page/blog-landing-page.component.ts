import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'blog-landing-page',
  templateUrl: './blog-landing-page.component.html'
})
export class BlogLandingPageComponent implements OnInit, AfterViewInit {
  public pageContent: any;
  public loading = true;
  public posts = [];
  public postsLatest = [];
  public mediumPosts = [];

  constructor(
    private router: Router,
    private pagesService: PagesService,
    private meta: Meta
    ) { }

  ngOnInit() {
    this.renderPage();
    this.getMediumFeed();
  }

  ngAfterViewInit() {
  }

  private renderPage() {
    window.scroll(0, 0);
    this.pagesService.createPage(this.router.url)
      .subscribe(
        res => {
          this.pageContent = res;
          this.pageContent.meta.children.children.map((post) => {
            this.pagesService.getPage(post.id)
              .subscribe(
                (posts) => {
                  this.posts.push(posts);
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
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  getMediumFeed() {
    this.pagesService.getMediumFeed()
      .subscribe(res => {
        this.mediumPosts = res['items'];
      });
  }

}
