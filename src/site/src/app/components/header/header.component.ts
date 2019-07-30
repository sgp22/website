import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'site-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('mainNavMobile', { static: true }) mobileNavItem: ElementRef;
  @ViewChild('trigger', { static: true }) trigger: ElementRef;
  @ViewChild('mobileTrigger', { static: true }) mobileTrigger: ElementRef;

  @Input() isHome: boolean;
  @Input() headerTop: boolean;
  @Input() themeVariant: string;

  public navItems: any;
  public navToggle = false;
  public popupmenuToggle = false;

  constructor(
    private pagesService: PagesService,
  ) { }

  ngOnInit() {
    this.pagesService.getGlobalNav().subscribe(
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
  }

  toggleNav() {
    this.navToggle = !this.navToggle;
  }

  closeNav() {
    this.navToggle = false;
  }
}
