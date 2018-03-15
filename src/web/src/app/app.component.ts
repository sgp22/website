import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PagesService } from './shared/pages.service';
declare let pendo;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [PagesService]
})

export class AppComponent {
  public home;
  public useGrid;
  public codeSection;
  public section;
  public sidebarNav;
  public footerNav;
  public is_production = IS_PRODUCTION;
  public showSplashPage: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) {

    router.events.subscribe( (event) => {
      if (event instanceof NavigationEnd) {

        const url = router.routerState.snapshot.url;
        const title = url.replace(/^\//g, '').replace(/\//g, ' / ').replace(/-/g, ' ');
        if (url === '/') {
          this.home = true;
          titleService.setTitle(`Home - Infor Design System`);
        } else {
          this.home = false;
          titleService.setTitle(`${this.capitalizeTitle(title)} - Infor Design System`);
        }

        if (url === '/' && this.is_production) {
          this.showSplashPage = true;
        } else {
          this.showSplashPage = false;
        }

        const urlSegments = event.url.split('/');
        (urlSegments[1] === 'code') ? this.codeSection = true : this.codeSection = false;
        (urlSegments[1] === 'code' || url === '/') ? this.useGrid = false : this.useGrid = true;

        // Initialize Pendo on page change
        pendo.initialize({
          visitor: {
            id: 'VISITOR-UNIQUE-ID'   // Required if user is logged in
            // email:        // Optional
            // role:         // Optional

            // You can add any additional visitor level key-values here,
            // as long as it's not one of the above reserved names.
          },

          account: {
            // id:           'ACCOUNT-UNIQUE-ID' // Highly recommended
            // name:         // Optional
            // planLevel:    // Optional
            // planPrice:    // Optional
            // creationDate: // Optional

            // You can add any additional account level key-values here,
            // as long as it's not one of the above reserved names.
          }
        });

      }
    });

    this.pagesService.getGlobalNav()
      .subscribe(
        (res: any) => {

          const addTrigger = res.items.filter((item) => {
            (item.meta.slug === 'code') ? item.trigger = true : item.trigger = false;
            return item;
          });
          this.footerNav = addTrigger.sort((a, b) => {
            return a.meta.menu_order > b.meta.menu_order ? 1 : -1;
          });
        }
      );

  }

  public capitalizeTitle(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

}
