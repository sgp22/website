import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [PagesService]
})
export class HeaderComponent implements OnInit {

  @ViewChild('mainNavMobile') mobileNavItem: ElementRef;
  @ViewChild('trigger') trigger: ElementRef;
  @ViewChild('mobileTrigger') mobileTrigger: ElementRef;
  @Input() globalNav;
  @Input() home;
  public navItems: any;
  public domain: string = DOMAIN;
  public navToggle = false;
  public popupmenuToggle = false;

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
    private elRef: ElementRef
  ) { }

  ngOnInit() {
    this.pagesService.getGlobalNav()
      .subscribe(
        (res: any) => {

          const addTrigger = res.items.filter((item) => {
            (item.meta.slug === 'code') ? item.trigger = true : item.trigger = false;
            return item;
          });
          this.navItems = addTrigger.sort((a, b) => {
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

  @HostListener('document:click', ['$event'])
  dropdown(event) {
    if ((this.trigger.nativeElement as HTMLElement).contains(event.target) || (this.mobileTrigger.nativeElement as HTMLElement).contains(event.target) ) {
      this.popupmenuToggle = !this.popupmenuToggle;
    } else {
      this.popupmenuToggle = false;
    }
  }

  handleDropdownLink(link) {
    this.router.navigate([link]);
  }

}
