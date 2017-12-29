import { Component, DoCheck } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DisplayGlobalNavService } from './shared/display-global-nav.service';
import { Title } from '@angular/platform-browser';
declare let pendo;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [DisplayGlobalNavService]
})

export class AppComponent implements DoCheck {

  public displayGlobalNav: boolean;
  public displaySidebarNav: boolean;
  public rootUrlPath = ROOT_URL_PATH;
  public svgAssetsPath = '';

  constructor(
    private globalNav: DisplayGlobalNavService,
    private router: Router,
    private titleService: Title,
  ) {

    router.events.subscribe( (event) => {
      if (event instanceof NavigationEnd) {
        const url = router.routerState.snapshot.url;
        const title = url.replace(/^\//g, '').replace(/\//g, ' / ').replace(/-/g, ' ');
        if (url === '/') {
          titleService.setTitle(`Home - Infor UX`);
        } else {
          titleService.setTitle(`${this.capitalizeTitle(title)} - Infor UX`);
        }

        this.svgAssetsPath = 'assets/iux/svgs/inline-icons.svg';
        if (this.rootUrlPath) {
          this.svgAssetsPath = '/assets/iux/svgs/inline-icons.svg';
        }

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

  }

  public capitalizeTitle(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  ngDoCheck() {
    this.displayGlobalNav = this.globalNav.displayGlobalNav;
    this.displaySidebarNav = this.globalNav.displaySidebarNav;
  }

}
