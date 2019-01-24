import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'core-content-page',
  templateUrl: './core-content-page.component.html',
  styleUrls: ['./core-content-page.component.css']
})
export class CoreContentPageComponent implements OnInit {
  public pageContent: any;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegment => {
      this.loading = true;
      window.scroll(0, 0);
      this.pagesService.createPage(this.router.url)
        .subscribe(
          res => {
            this.pageContent = res;
          },
          err => {
            console.error(err);
            this.loading = false;
          },
          () => {
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

}
