import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public pageContent: any;
  public loading:boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegment => {
      window.scroll(0, 0);
      this.pagesService.createPage(this.router.url)
        .subscribe(
          res => {
            this.pageContent = res;
            console.log(this.pageContent);
          },
          err => {
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      (<any>window).ga('send', 'pageview');
    });
  }

}
