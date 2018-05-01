import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  providers: [PagesService]
})
export class LandingPageComponent implements AfterViewInit {
  public pageContent: any;

  constructor(
    private router: Router,
    private pagesService: PagesService,
    private loadingBar: LoadingBarService
  ) { }

  ngAfterViewInit() {

    this.renderPage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.renderPage();
      }
    });

  }

  private renderPage() {
    this.loadingBar.start();
    this.pagesService.createPage(this.router.url)
      .subscribe(
        res => {
          this.pageContent = res;
        },
        err => {
          console.error(err);
        },
        () => {
          this.loadingBar.complete();
        }
      )
  }

}
