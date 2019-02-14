import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { LibraryService } from '../../shared/library.service';
import { HelpersService } from '../../shared/helpers.service';
import * as semver from 'semver';

@Component({
  selector: 'sidebar-code',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnChanges {
  public sidebarPath: string;
  public sidebarNav: any;
  public versionPaths: any;
  public currentLibrary: string;
  public currentVersion: string;
  public loading: boolean;
  public expandedLevel1: any = [];
  public urlSegments: any;
  @Input() lib;
  @Input() ver;

  constructor(
    private sidebarService: SidebarService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router,
    private helpers: HelpersService
  ) { }

  ngOnChanges() {
    this.urlSegments = this.route.snapshot['_urlSegment'].segments;
    if (!this.urlSegments[1]) {
      this.router.navigate(['404']);
      return;
    }
    const path = `${this.urlSegments[1].path}/${this.urlSegments[2].path}`;
    const library = `${this.urlSegments[1].path}`;
    const version = `${this.urlSegments[2].path}`;
    this.updateNav(path, library, version);
  }

  ngOnInit() {}

  updateNav(path, lib, version) {
    this.sidebarPath = path;
    this.currentLibrary = lib;
    this.currentVersion = version;

    this.sidebarService.loadSitemap(path).subscribe(res => {
      this.sidebarNav = res['sections'];
      this.loading = false;

      if (this.helpers.checkViewport('(min-width: 600px)')) {
        setTimeout(() => {
          this.expandedLevel1 = this.helpers.closeAccordionsMobile(this.sidebarNav);
        });
      }
    });

    this.libraryService.loadAllLibraryVersions(this.currentLibrary)
      .subscribe(res => {
        this.versionPaths = res['files']
          .map(file => {
            const versions = {};
            versions['full'] = file.replace(/docs/, '');
            versions['label'] = file.split('/').slice(-2, -1).join('');
            return versions;
          })
          .sort((a, b) => {
            return semver.compare(a.label, b.label);
          })
          .reverse();

        this.versionPaths.unshift({
          full: `/${this.currentLibrary}/latest/`,
          label: `Latest (${this.versionPaths[0]['label']})`
        });
      });
  }

  onVersionChange(version) {
    this.router.navigate([version]);
  }

}
