import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  providers: [PagesService]
})
export class SidebarNavComponent implements OnInit {

  @Input() sidebarData;
  @Input() section;
  // @Input() hasGrandchildren;
  public sidebarNav: any;
  public sectionTitle: any;
  public grandChildren: boolean;
  public hasGrandchildren: boolean;

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

    // this.sidebarNav = this.sidebarData;
    // this.sectionTitle = this.section;
    // this.grandChildren = this.hasGrandchildren;

    const url = this.router.routerState.snapshot.url;
    const urlSegments = url.split('/');
    urlSegments.shift();
    this.section = urlSegments[0];

    this.pagesService.getAll().subscribe((res) => {
      console.log(res);
      res['items'].filter((item) => {
        if (item.meta.slug === this.section) {
          console.log(this.section);
          if (item.meta.children.children.length === 1 && item.meta.children.children[0].children_count == 0) {
            this.hasGrandchildren = false
          }
          this.sidebarNav = item.meta.children.children.sort((thisChild, nextChild) => {
            item.meta.children.children.map(child => {
              child.children.length <= 0 ? this.hasGrandchildren = false : this.hasGrandchildren = true;
              child.children.sort((thisGrandChild, nextGrandchild) => {
                return thisGrandChild.title > nextGrandchild.title ? 1 : -1;
              });
            });
            if (this.hasGrandchildren) {
              return thisChild.menu_order > nextChild.menu_order ? 1 : -1;
            } else {
              return thisChild.title > nextChild.title ? 1 : -1;
            }
          });
        }
      });
    })

  }

}
