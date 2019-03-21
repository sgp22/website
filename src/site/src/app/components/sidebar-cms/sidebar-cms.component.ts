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
    this.sectionTitle = this.section;
    this.pagesService.getCMSSidebarParent(this.section)
      .subscribe(res => {
        this.loading = true;
        this.pagesService.getCMSSidebarNav(res['items'][0]['id'])
          .subscribe(res => {
            this.sidebarNav = res['items'];
          },
          (err) => {
            this.loading = false;
            console.error(err);
          },
          () => {
            this.loading = false;
          })
      },
      (err) => {
        this.loading = false;
        console.error(err);
      },
      () => {
        this.loading = false;
      })
  }

  closeSidebar() {
    if (this.helpers.checkViewport('(min-width: 600px)')) {
      this.closeSB.emit('closed');
    }
  }

}
