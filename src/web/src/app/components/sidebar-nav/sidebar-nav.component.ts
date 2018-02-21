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
  public sidebarNav: any;
  public sectionTitle: any;
  public grandChildren: boolean;
  public loading: boolean;

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        const urlSegments = event.url.split('/');
        this.section = urlSegments[1];

        this.loading = true;
        this.pagesService.getAll().subscribe(
          (res) => {
            res['items'].filter((item) => {
              if (item.meta.slug === this.section) {
                if (item.meta.children.children.length === 1 && item.meta.children.children[0].children_count == 0) {
                  this.grandChildren = false
                }
                this.sidebarNav = item.meta.children.children.sort((thisChild, nextChild) => {
                  item.meta.children.children.map(child => {
                    child.children.length <= 0 ? this.grandChildren = false : this.grandChildren = true;
                    child.children.sort((thisGrandChild, nextGrandchild) => {
                      return thisGrandChild.title > nextGrandchild.title ? 1 : -1;
                    })
                  });
                  if (this.grandChildren) {
                    return thisChild.menu_order > nextChild.menu_order ? 1 : -1;
                  } else {
                    this.sectionTitle = this.section;
                    return thisChild.title > nextChild.title ? 1 : -1;
                  }
                });
                console.log(this.sidebarNav);
              }
            });
          },
          () => {
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        )
      }
    })

  }

}
