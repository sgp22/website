import { Component, DoCheck } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DisplayGlobalNavService } from './shared/display-global-nav.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DisplayGlobalNavService]
})

export class AppComponent implements DoCheck {

  public displayGlobalNav: boolean;

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
      }

    });

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
    console.log(newTitle);
  }

  public capitalizeTitle(str) {
   return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  ngDoCheck() {
    this.displayGlobalNav = this.globalNav.displayGlobalNav;
  }

}
