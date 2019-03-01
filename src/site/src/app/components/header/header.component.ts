import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { LibraryService } from '../../shared/library.service';

@Component({
  selector: 'site-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('mainNavMobile') mobileNavItem: ElementRef;
  @ViewChild('trigger') trigger: ElementRef;
  @ViewChild('mobileTrigger') mobileTrigger: ElementRef;
  @Input() isHome: boolean;
  public navItems: any;
  public navToggle = false;
  public popupmenuToggle = false;
  public libraries: any;
  public headerTop = false;

  constructor(
    private pagesService: PagesService,
    private libraryService: LibraryService
  ) { }

  ngOnInit() {
    this.pagesService.getGlobalNav()
      .subscribe(
        (res: any) => {
          const modifyCodeSlug = res.items.filter((item) => {
            if (item.title === 'Components') {
              item.meta.slug = 'code/ids-enterprise/latest/';
            }
            return item;
          });
          this.navItems = modifyCodeSlug.sort((a, b) => {
            return a.meta.menu_order > b.meta.menu_order ? 1 : -1;
          });
        }
      );

    this.libraryService.loadAllLibraries()
      .subscribe(
        (res: any) => {
          this.libraries = res;
        }
      );
  }

  toggleNav() {
    this.navToggle = !this.navToggle;
  }

  closeNav() {
    this.navToggle = false;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (this.isHome) {
      if (window.pageYOffset > 300) {
        this.headerTop = true;
      } else {
        this.headerTop = false;
      }
    }
  }
}
