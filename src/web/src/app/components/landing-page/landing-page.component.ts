import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  providers: [PagesService]
})
export class LandingPageComponent implements OnInit, AfterViewInit {

  public page: any;
  public flexibleContent: any;
  public pageType: any = 'home.LandingPage';
  public notFound = false;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {

    let slug;

    this.route.params.subscribe(params => {
      slug = params['slug'];
      this.pagesService
        .getPage(slug, this.pageType)
        .subscribe(
          (res: any) => {
            if (res && res.items.length) {
              this.page = res.items[0];
              this.flexibleContent = res.items[0].content;
              this.notFound = false;
              this.loading = false;
            } else {
              this.notFound = true;
            }
          },
          err => {
            console.log(err);
          }
        );
    });

  }


}
