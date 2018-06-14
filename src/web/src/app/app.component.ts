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
  public blog;
  public section;
  public sidebarNav;
  public footerNav;

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

        const urlSegments = event.url.split('/');
        (urlSegments[1] === 'code') ? this.codeSection = true : this.codeSection = false;
        (url === '/') ? this.useGrid = false : this.useGrid = true;
        (urlSegments[1] === 'blog') ? this.blog = true : this.blog = false;

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

        // Google Analytics
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');

        const clientID = this.getClientID();
        (<any>window).gtag('set', { 'user_id': `${clientID}` });
        (<any>window).ga('set', { 'dimension7': `${clientID}`});

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
      const title = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      return title.replace('Ids', 'IDS');
    });
  }

  public getClientID() {
    try {
      var trackers = (<any>window).ga.getAll();
      var i, len;
      for (i = 0, len = trackers.length; i < len; i += 1) {
        if (trackers[i].get('trackingId') === 'UA-40840710-5') {
          return trackers[i].get('clientId');
        }
      }
    } catch (e) { }
    return 'false';
  }

}
