import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChildren, QueryList, ContentChildren, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as semver from 'semver';

import { UrlParser } from '../../shared/urlParser.service';
import { UrlMapper } from '../../shared/urlMapper.service';
import { SitemapService } from '../../shared/sitemap.service';
import { LibraryService } from '../../shared/library.service';

@Component({
  selector: 'sidebar-nav-code',
  templateUrl: './sidebar-nav-code.component.html',
  providers: [SitemapService, LibraryService, UrlMapper, UrlParser]
})
export class SidebarNavCodeComponent implements OnInit {
  @ViewChildren('expandableList') expandableList: QueryList<any>;
  public path = '';
  public basePath = '';
  public mapPath = '';
  public sidebarPath = '';
  public sidebarNav: any;
  public versionPaths: any;
  public libraryPaths: any;
  public currentVersion: any;
  public library = '';
  public selectedVersion = '';
  public selectedLibrary = '';
  public section: any;
  public element: any;
  public expandedLevel1: any = [];
  public expandableListAllClosed: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sitemapService: SitemapService,
    private libraryService: LibraryService,
    private urlMapper: UrlMapper,
    private urlParser: UrlParser
  ) {}


  ngOnInit() {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {

        const urlSegments = event.url.split('/');
        this.section = urlSegments[1];

        if (this.section !== 'code') {
          return;
        }

        if (urlSegments.length === 5) {
          this.library = urlSegments[2];
          this.element = urlSegments[5];
        } else {
          this.library = urlSegments[2];
          this.element = null;
        }

        this.createLibraryPaths();

        this.libraryService
          .getAllLibraryVersionPaths(this.library)
          .subscribe(res => {

            this.handleSidebar(urlSegments);
            this.createVersionPaths(res, urlSegments);

          });

      }

    });

  }

  handleSidebar(urlSegments) {

    if (urlSegments.length === 5) {
      this.sidebarPath = urlSegments.slice(2, -1).join('/');
    } else {
      this.sidebarPath = urlSegments.slice(2, 4).join('/');
    }

    this.selectedLibrary = urlSegments[2];
    this.selectedVersion = `/${this.sidebarPath}/`;

    this.sitemapService
      .getSitemap(this.sidebarPath)
      .subscribe(
        (sidebar) => {
          this.sidebarNav = sidebar['sections'];
          this.closeAccordionsMobile(this.sidebarNav);
        }
      );

  }

  createVersionPaths(res, urlSegments) {

    const latestVersion = '';

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
      full: `/${this.library}/latest/`,
      label: `Latest (${this.versionPaths[0]['label']})`
    });

  }

  createLibraryPaths() {
    this.libraryService
      .getAllLibraries()
      .subscribe(res => {
        this.libraryPaths = res;
      });
  }

  onVersionChange(version) {
    this.router.navigate([version]);
  }

  onLibraryChange(library) {
    this.router.navigate([library]);
  }

  private toggleAccordion(i) {
    this.expandedLevel1[i] = !this.expandedLevel1[i];
  }

  private closeAccordionsMobile(sidebarNav) {

    const checkViewport = (vp) => {
      if (!vp.matches) {
          setTimeout(() => {
            this.expandedLevel1 = sidebarNav.map(i => true);
        });
      };
    };

    let viewport = window.matchMedia('(min-width: 600px)');
    checkViewport(viewport);

  }

}
