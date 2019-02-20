import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { HelpersService } from '../../shared/helpers.service';

@Component({
  selector: 'sidebar-cms',
  templateUrl: './sidebar-cms.component.html'
})
export class SidebarCmsComponent implements OnInit {
  @Input() sidebarData;
  @Input() section;
  public sidebarNav: any;
  public sectionTitle: any;
  public level_2: boolean;
  public loading: boolean;
  public expandedLevel1: any = [];
  public halp: any = [];
  @Output() closeSB = new EventEmitter();

  constructor(
    private pagesService: PagesService,
    private route: ActivatedRoute,
    private helpers: HelpersService
  ) { }

  ngOnInit() {
    const urlSegments = this.route.snapshot['_urlSegment'].segments;
    const preview = urlSegments[1] ? urlSegments[1].path.match(/id=\d{1,10}/g) : urlSegments[0];
    const previewSlug = urlSegments[1] ? urlSegments[1].path.split('?') : urlSegments[0].path.split('?');
    preview ? this.section = previewSlug[0] : this.section = urlSegments[0].path;

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
                  if (thisGrandChild.menu_order === 0 && nextGrandchild.menu_order === 0) {
                    return thisGrandChild.title.toLowerCase() > nextGrandchild.title.toLowerCase() ? 1 : -1;
                  } else {
                    return thisGrandChild.menu_order > nextGrandchild.menu_order ? 1 : -1;
                  }
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
              if (thisChild.menu_order === 0 && nextChild.menu_order === 0) {
                return thisChild.title.toLowerCase() > nextChild.title.toLowerCase() ? 1 : -1;
              } else {
                return thisChild.menu_order > nextChild.menu_order ? 1 : -1;
              }
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

  closeSidebar() {
    this.closeSB.emit('closed');
  }

}
