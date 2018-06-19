import { Component, AfterViewInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { debug } from 'util';

@Component({
  selector: 'app-core-content-page',
  templateUrl: './core-content-page.component.html',
  providers: [PagesService]
})

export class CoreContentPageComponent implements AfterViewInit {
  public pageContent: any;
  public loading = true;
  public notFound = false;
  @HostBinding('class.ids-row--offset-xl-2')
  @HostBinding('class.ids-row--offset-sm-3')
  @HostBinding('class.ids-row--col-sm-9')
  @HostBinding('class.ids-row--col-xl-10') grid = true;
  @ViewChild('footer') footer: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private loadingBar: LoadingBarService
  ) {}

  ngAfterViewInit() {
    this.route.url.subscribe(urlSegment => {
      this.loadingBar.start();
      window.scroll(0, 0);
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

      (<any>window).ga('set', {
        'dimension2': (urlSegment[2] ? `${urlSegment[2].path}` : 'n/a'),
        'dimension3': `${urlSegment[1].path}`,
        'dimension4': `${urlSegment[0].path}`
      });
      (<any>window).ga('send', 'pageview');
    });

  }

  public getClientID() {
    try {
      const trackers = (<any>window).ga.getAll();
      let i, len;
      for (i = 0, len = trackers.length; i < len; i += 1) {
        if (trackers[i].get('trackingId') === 'UA-40840710-5') {
          return trackers[i].get('clientId');
        }
      }
    } catch (e) { }
    return 'false';
  }

}
