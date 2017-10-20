import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-element-page',
  templateUrl: './element-page.component.html',
  styleUrls: ['./element-page.component.css'],
  providers: [PagesService]
})
export class ElementPageComponent implements OnInit {

  public pageType: any = 'home.ElementsPage';
  public page: any;
  public options: any;
  public types: any;
  public sidebar: any = true;		
  public sidebarNav: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
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
        (res) => {
          this.page = res.items[0];
          this.types = res.items[0].types;
          this.options = res.items[0].options;
          console.log(res);
        }
      )

    this.router.events		
      .filter((e) => e instanceof NavigationEnd)		
      .switchMap(e => this.pagesService.getPage(slug, this.pageType))		
        .subscribe(		
          (res) => {		
            this.page = res.items[0];
            this.types = res.items[0].types;
            this.options = res.items[0].options;		
          }		
        ) 

      this.pagesService.getSideBarNav()		
        .subscribe(		
          (res) => {		
            res.filter((nav) => {		
              if(nav.meta.slug === urlSegment) {		
                this.sidebarNav = nav;		
                console.log(nav);
              }		
            })		
          }		
        )		
      		
      this.router.events		
        .filter((e) => e instanceof NavigationEnd)		
        .switchMap(e => this.pagesService.getSideBarNav())		
          .subscribe(		
            (res) => {		
              res.filter((nav) => {		
                if(nav.meta.slug === urlSegment) {		
                  this.sidebarNav = nav;		
                }		
              })		
            }		
          ) 
  }

}
