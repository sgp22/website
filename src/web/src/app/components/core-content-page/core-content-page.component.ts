import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-core-content-page',
  templateUrl: './core-content-page.component.html',
  styleUrls: ['./core-content-page.component.css'],
  providers: [PagesService]
})
export class CoreContentPageComponent implements OnInit, AfterViewInit {

  public pageType: any = 'home.CoreContentPage';
  public page: any;
  public sidebar: any = true;
  public sidebarNav: any;
  public notFound = false;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private http: HttpClient,
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {

    let slug;
    let urlSegment;
    this.route.url.forEach((url: any) => {
      urlSegment = url[0].path;
    });

    this.route.params.forEach((params: Params) => {
      slug = params['slug'];
    });

    this.pagesService.getPage(slug, this.pageType)
      .subscribe(
        (res: any) => {
          if (res && res.items.length) {
            this.page = res.items[0];
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        (err) => {
          console.log(err);
        }
    );

    this.router.events
      .filter((e) => e instanceof NavigationEnd)
        .switchMap(e => this.pagesService.getPage(slug, this.pageType))
          .subscribe(
            (res: any) => {
              if (res && res.items.length) {
                this.page = res.items[0];
                this.notFound = false;
              } else {
                this.notFound = true;
              }
            },
            (err) => {
              console.log(err);
            }
        );

    this.pagesService.getSideBarNav()
      .subscribe(
        (res: any) => {
          res.filter((nav) => {
            if (nav.meta.slug === urlSegment) {
              console.log(nav);
              this.sidebarNav = nav;
              console.log(this.sidebarNav);
            }
          });
        }
      );

    this.router.events
      .filter((e) => e instanceof NavigationEnd)
      .switchMap(e => this.pagesService.getSideBarNav())
        .subscribe(
          (res: any) => {
            res.filter((nav) => {
              if (nav.meta.slug === urlSegment) {
                this.sidebarNav = nav;
              }
            });
          }
        );

  }
}
