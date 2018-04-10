import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChildren, QueryList} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  providers: [PagesService]
})
export class SidebarNavComponent implements OnInit, AfterViewInit {
  @ViewChildren('expandableList') expandableList: QueryList<any>;
  @Input() sidebarData;
  @Input() section;
  public sidebarNav: any;
  public sectionTitle: any;
  public level_2: boolean;
  public loading: boolean;
  public expandedLevel1: any = [];
  public expandedLevel2: any = [];

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
    private elRef: ElementRef
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
                if (item.meta.children.children.length === 1 && item.meta.children.children[0].children_count === 0) {
                  this.level_2 = false;
                }
                this.sidebarNav = item.meta.children.children.sort((thisChild, nextChild) => {
                  item.meta.children.children.map(child => {
                    child.children.length <= 0 ? this.level_2 = false : this.level_2 = true;
                    child.children.sort((thisGrandChild, nextGrandchild) => {
                      return thisGrandChild.menu_order > nextGrandchild.menu_order ? 1 : -1;
                    });
                    child.children
                      .filter(child_level_3 => {
                        if (child_level_3.children && child_level_3.children.length > 0) {
                          child_level_3.children.sort((thisChild_level_3, nextChild_level_3) => {
                            return thisChild_level_3.title > nextChild_level_3.title ? 1 : -1;
                          });
                        }
                      });
                  });
                  this.sectionTitle = item.title;
                  return thisChild.menu_order > nextChild.menu_order ? 1 : -1;
                });
              }
            });
          },
          () => {
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      }
    });

    this.closeAccordionsMobile();

  }

  private handleAccordion(i) {
    this.expandedLevel1[i] = !this.expandedLevel1[i];
  }

  private closeAccordionsMobile() {

    const checkViewport = (vp) => {
      if (!vp.matches) {
        this.expandableList.changes.subscribe(item => {
          setTimeout(() => {
            this.expandedLevel1 = item._results.map(i => true);
          });
        });
      };
    };

    let viewport = window.matchMedia('(min-width: 600px)');
    checkViewport(viewport);

  }

}
