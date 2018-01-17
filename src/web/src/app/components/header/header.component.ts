import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [PagesService],
})
export class HeaderComponent implements OnInit {

  @ViewChild('mainNavMobile') mobileNavItem: ElementRef;
  @Input() globalNav;
  @Input() home;
  public navItems: any;
  public domain: string = DOMAIN;
  public navToggle = false;

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pagesService.getGlobalNav()
      .subscribe(
        (res: any) => {
          this.navItems = res.items.sort((a, b) => {
            return a.meta.menu_order > b.meta.menu_order ? 1 : -1;
          });
        }
      );
  }

  toggleNav() {
    this.navToggle = !this.navToggle;
  }

  closeNav() {
    this.navToggle = false;
  }

}
