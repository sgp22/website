import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  providers: [PagesService, DisplayGlobalNavService]
})
export class SidebarNavComponent implements OnInit, AfterViewInit {

  @Input() displaySidebarNav: any;
  public sidebarNav: any;
  public section: any;

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
    private globalNav: DisplayGlobalNavService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.url.split('/');
        this.section = urlSegments[1];
      }
    });

    this.pagesService.getAll()
      .subscribe(
        res => {
          res['items'].filter((item) => {
            if (item.meta.slug === this.section) {
              this.sidebarNav = item.meta.children.children.sort((thisChild, nextChild) => {
                item.meta.children.children.map(child => {
                  child.children.sort((thisGrandChild, nextGrandchild) => {
                    return thisGrandChild.title > nextGrandchild.title ? 1 : -1;
                  });
                });
                return thisChild.menu_order > nextChild.menu_order ? 1 : -1;
              });
            }
          });
        }
      );

  }

}
