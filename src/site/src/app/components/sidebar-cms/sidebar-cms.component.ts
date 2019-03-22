import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { HelpersService } from '../../shared/helpers.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'sidebar-cms',
  templateUrl: './sidebar-cms.component.html'
})
export class SidebarCmsComponent implements OnInit {
  @Input() sidebarData;
  @Input() section;
  public sidebarNav: Observable<[]>;
  public parentTitle: string;
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
    this.parentTitle = this.section;
    this.pagesService.getCMSSidebarParent(this.section).pipe(
      mergeMap(parent => this.pagesService.getCMSSidebarNav(parent['items'][0]['id']))
    ).subscribe(children => {
      this.sidebarNav = children['items'];
    },
    (err) => {
      this.loading = false;
      console.error(err);
    },
    () => {
      this.loading = false;
    });
  }

  closeSidebar() {
    if (this.helpers.checkViewport('(min-width: 600px)')) {
      this.closeSB.emit('closed');
    }
  }

}
