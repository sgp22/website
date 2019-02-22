import { Component, OnInit, HostListener, Host } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { slideInLeft } from '../../animations';
import { HelpersService } from '../../shared/helpers.service';

@Component({
  selector: 'code-page',
  templateUrl: './code-page.component.html',
  animations: [slideInLeft]
})
export class CodePageComponent implements OnInit {
  public library: string;
  public libVersion: string;
  public sidebarOpen = 'open';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private h: HelpersService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(res => {
        const urlSegments = res['url'].split('/');
        this.library = urlSegments[2];
        this.libVersion = urlSegments[3];
      });

    if (this.h.checkViewport('(min-width: 600px)')) {
      this.sidebarOpen = 'closed';
    }
  }

  @HostListener('window:resize', ['$event'])
  windowResize(event) {
    if (event.target.innerWidth <= 600) {
      this.sidebarOpen = 'closed';
    } else {
      this.sidebarOpen = 'open';
    }
  }

  openSidebar() {
    this.sidebarOpen = 'open';
  }

  closeSidebar() {
    this.sidebarOpen = 'closed';
  }

}
