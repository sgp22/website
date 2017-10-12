import { Component, OnInit } from '@angular/core';
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
export class LandingPageComponent implements OnInit {

  public page: any;
  public pageType: any = 'home.LandingPage';
  public sidebarNav: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
    
    let slug;
    this.route.params.forEach((params: Params) => {
      slug = params['slug'];
    });
    
    this.pagesService.getPage(slug, this.pageType)
      .subscribe(
        (res) => { 
          this.page = res.items[0];
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
      )

    this.router.events
      .filter((e) => e instanceof NavigationEnd)
      .switchMap(e => this.pagesService.getPage(slug, this.pageType))
        .subscribe(
          (res) => { 
            this.page = res.items[0];
          },
          (err) => {
            console.log(err);
          }
      )

    this.router.events
      .filter((e) => e instanceof NavigationEnd)
      .switchMap(e => this.pagesService.getSideBarNav())
        .subscribe(
          (res) => {
            this.sidebarNav = res;
            console.log(this.sidebarNav);
          }
        ) 

  }

}
