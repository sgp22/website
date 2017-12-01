import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-core-content-page',
  templateUrl: './core-content-page.component.html',
  providers: [PagesService]
})
export class CoreContentPageComponent implements OnInit, AfterViewInit {
  public pageType: any = 'home.CoreContentPage';
  public page: any;
  public body: any;
  public streamfields: any;
  public sidebar: any = true;
  public notFound = false;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    let slug;
    let urlSegment;
    this.route.url.forEach((url: any) => {
      urlSegment = url[0].path;
    });

    this.route.params.subscribe(params => {
      slug = params['slug'];
      this.pagesService
        .getPage(slug, this.pageType)
        .subscribe(
          (res: any) => {
            if (res && res.items.length) {
              this.page = res.items[0];
              this.body = res.items[0].body;
              this.streamfields = res.items[0].body;
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
