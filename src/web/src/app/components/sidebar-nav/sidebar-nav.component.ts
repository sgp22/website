import { Component, OnInit, AfterViewInit, Input, ElementRef} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { HelpersService } from '../../shared/helpers.service';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  providers: [PagesService, HelpersService]
})
export class SidebarNavComponent implements OnInit, AfterViewInit {
  @Input() sidebarData;
  @Input() section;
  public sidebarNav: any;
  public sectionTitle: any;
  public level_2: boolean;
  public loading: boolean;
  public expandedLevel1: any = [];
  public halp: any = [];

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private helpers: HelpersService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        const urlSegments = event.url.split('/');
        const preview = urlSegments[1].match(/id=\d{1,10}/g);
        const previewSlug = urlSegments[1].split('?');
        preview ? this.section = previewSlug[0] : this.section = urlSegments[1];

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
                if (this.helpers.checkViewport('(min-width: 600px)')) {
                  setTimeout(() => {
                    this.expandedLevel1 = this.helpers.closeAccordionsMobile(this.sidebarNav);
                  });
                }

              }
            });
          },
          (err) => {
            this.loading = false;
            console.error(err);
          },
          () => {
            this.loading = false;
          }
        );
      }
    });

  }

}
