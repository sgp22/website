import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare let pendo;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Infor Design System';
  public sohoModalVisible = false;

  public constructor(
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        // Set Page Title
        const url = this.router.routerState.snapshot.url;
        const title = url.replace(/^\//g, '').replace(/\//g, ' / ').replace(/-/g, ' ');
        this.titleService.setTitle(this.capitalizeTitle(title) + ` - Infor Design System`);

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

        // Google analytics
        (<any>window).ga('set', 'page', event['urlAfterRedirects']);

        const clientID = this.getClientID();
        if (clientID !== 'false') {
          (<any>window).ga('set', { 'userId': `${clientID}` });
          (<any>window).ga('set', { 'dimension7': `${clientID}` });
        }
      })
  }

  public capitalizeTitle(str) {
    return str.replace(/\w\S*/g, function (txt) {
      const title = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      return title.replace('Ids', 'IDS');
    });
  }

  public getClientID() {
    try {
      const trackers = (<any>window).ga.getAll();
      let i, len;
      for (i = 0, len = trackers.length; i < len; i += 1) {
        if (trackers[i].get('trackingId') === 'UA-40840710-5') {
          return trackers[i].get('clientId');
        }
      }
    } catch (e) { }
    return 'false';
  }

  public showSohoModal() {
    const referrer = document.referrer;
    if (referrer === 'https://soho.infor.com/') {
      this.sohoModalVisible = true;
    }
  }

  public closeSohoModal() {
    this.sohoModalVisible = false;
  }

}
