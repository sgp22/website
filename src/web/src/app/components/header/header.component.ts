import { Component, OnInit, Input, AfterViewInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [PagesService, DisplayGlobalNavService],
})
export class HeaderComponent implements OnInit, AfterViewInit, DoCheck {

  @Input() displayGlobalNav: any;
  @ViewChild('mainNavMobile') mobileNavItem: ElementRef;
  public navItems: any;
  public loading = true;
  public domain: string = DOMAIN;
  public navToggle = false;

  constructor(
    private pagesService: PagesService,
    private globalNav: DisplayGlobalNavService,
    private router: Router,
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {

    this.pagesService.getGlobalNav()
      .subscribe(
        (res: any) => {
          this.navItems = res.items.sort((a, b) => {
            return a.meta.menu_order > b.meta.menu_order ? 1 : -1;
          });
        }
      );

  }

  ngDoCheck() {
    this.loading = false;
  }

  toggleNav() {
    this.navToggle = !this.navToggle;
  }

  closeNav() {
    this.navToggle = false;
  }

}
