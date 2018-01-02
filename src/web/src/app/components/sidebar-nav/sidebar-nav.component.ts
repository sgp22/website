import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  providers: [PagesService]
})
export class SidebarNavComponent implements OnInit, AfterViewInit {

  public sidebarNav: any;
  public section: any;

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {

    const url = this.router.routerState.snapshot.url;
    const urlSegments = url.split('/');
    urlSegments.shift();
    this.section = urlSegments[0];

    this.pagesService.getAll()
      .subscribe(
        res => {
          console.log(res);
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
