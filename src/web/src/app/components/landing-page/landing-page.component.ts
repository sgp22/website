import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [PagesService]
})
export class LandingPageComponent implements OnInit, AfterViewInit {

  public page: any;
  public pageType: any = 'home.LandingPage';
  public sidebarNav: any;
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

    this.pagesService.getSideBarNav()
      .subscribe(
        (res) => {
          this.sidebarNav = res;
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

    this.router.events
      .filter((e) => e instanceof NavigationEnd)
      .switchMap(e => this.pagesService.getSideBarNav())
        .subscribe(
          (res) => {
            this.sidebarNav = res;
            console.log(this.sidebarNav);
          }
        );

  }


}
