import { Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-element-page',
  templateUrl: './element-page.component.html',
  styleUrls: ['./element-page.component.css'],
  providers: [PagesService]
})
export class ElementPageComponent implements OnInit, AfterViewInit {

  public pageType: any = 'home.ElementsPage';
  public page: any;
  public options: any;
  public types: any;
  public sidebar: any = true;
  public notFound = false;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {

    let slug;
    let urlSegment;

    this.route.url.forEach((url) => {
      urlSegment = url[0].path;
    });

    this.route.params.forEach((params: Params) => {
      slug = params['slug'];
    });

    this.pagesService.getPage(slug, this.pageType)
      .subscribe(
        (res: any) => {
          if (res && res.items.length) {
            console.log(res);
            this.page = res.items[0];
            this.types = res.items[0].types;
            this.options = res.items[0].options;
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        }
      );

    this.router.events
      .filter((e) => e instanceof NavigationEnd)
      .switchMap(e => this.pagesService.getPage(slug, this.pageType))
        .subscribe(
          (res: any) => {
            if (res && res.items.length) {
              this.page = res.items[0];
              this.types = res.items[0].types;
              this.options = res.items[0].options;
              this.notFound = false;
            } else {
              this.notFound = true;
            }
          }
        );

  }

}
