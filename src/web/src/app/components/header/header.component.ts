import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { LibraryService } from '../../shared/library.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [PagesService, LibraryService]
})
export class HeaderComponent implements OnInit {

  @ViewChild('mainNavMobile') mobileNavItem: ElementRef;
  @ViewChild('trigger') trigger: ElementRef;
  @ViewChild('mobileTrigger') mobileTrigger: ElementRef;
  public navItems: any;
  public domain: string = DOMAIN;
  public navToggle = false;
  public popupmenuToggle = false;
  public libraries: any;

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private libraryService: LibraryService
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

    this.libraryService.getAllLibraries()
      .subscribe(
        (res: any) => {
          this.libraries = res;
        }
      )

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

}
