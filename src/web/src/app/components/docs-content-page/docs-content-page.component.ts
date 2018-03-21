import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { UrlParser } from '../../shared/urlParser.service';
import { UrlMapper } from '../../shared/urlMapper.service';
import { JsDocumentation } from '../../shared/js-documentation.service';
import * as semver from 'semver';

import { Token } from '../../shared/token';
import { TokenService } from '../../shared/token.service';

import { DocService } from '../../shared/doc.service';
import { LibraryService } from '../../shared/library.service';
import { SitemapService } from '../../shared/sitemap.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-docs-content-page',
  templateUrl: './docs-content-page.component.html',
  providers: [UrlParser, UrlMapper, JsDocumentation, TokenService, DocService, LibraryService, SitemapService]
})
export class DocsContentPageComponent implements OnInit, OnDestroy {
  public path = '';
  public basePath = '';
  public mapPath = '';
  public absolutePath = '';
  public domainPath = DOMAIN_DOCS_API;
  public docs: any;
  public trustedHtml: any;
  public section: any;
  public element: any;
  public sidebarNav: any;
  public versionPaths: any;
  public libraryPaths: any;
  public currentVersion: any;
  public selectedVersionNumber: any;
  public library = '';
  public loading = true;
  public notFound = false;
  public showWarning = false;
  public elements = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private urlParser: UrlParser,
    private urlMapper: UrlMapper,
    private comments: JsDocumentation,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService,
    private docService: DocService,
    private libraryService: LibraryService,
    private sitemapService: SitemapService,
    private loadingBar: LoadingBarService
  ) {}

  ngOnInit() {

    const urlSegment = [];

    this.route.url.subscribe(segment => {

      this.section = segment[0].path;

      if (segment.length === 4) {
        this.library = segment.slice(-3)[0].path;
        this.element = segment.slice(-1)[0].path;
      } else {
        this.library = segment.slice(-2)[0].path;
        this.element = null;
      }


      for (let i = 0; i < segment.length; i++) {
        urlSegment[i] = segment[i].path;
      }

      if (urlSegment.length === 4) {
        this.basePath = urlSegment.slice(0, -1).join('/');
      } else {
        this.basePath = urlSegment.join('/');
      }

      this.absolutePath = `/${this.basePath}`;

      this.loadingBar.start();

      this.libraryService
        .getAllLibraryVersionPaths(this.library)
        .subscribe(res => {

          this.createVersionPaths(res, urlSegment);

          this.docService
            .getDoc(`${this.domainPath}/${this.mapPath}`)
            .subscribe(
              (docs: any) => {

                this.elements = [];
                this.docs = docs;
                this.notFound = false;
                this.handleRelativeLinks(docs);

              },
              () => {
                this.stopRefreshing();
              },
              () => {
                this.loadingBar.complete();
                this.stopRefreshing();
                window.scrollTo(0, 0);
              }
            );
        });

    });
  }

  handleRelativeLinks(docs) {
    // Relative Link support.
    // tempNode needs to be created in order to convert
    // the fragment back to a string
    const tempNode = document.createElement('div');
    const absolute = /^((http|https|ftp):\/\/)/;
    const bodyFragments = document.createRange().createContextualFragment(docs.body);
    const allHrefs = Array.from(bodyFragments.querySelectorAll('a'));
    const allImgs = Array.from(bodyFragments.querySelectorAll('img'));
    const allIframes = Array.from(bodyFragments.querySelectorAll('iframe'));

    // Modify relative hrefs, img src and iframe src.
    if (allHrefs.length) {
      allHrefs.map(a => this.createRelativePath(a, 'href'));
    }

    if (allImgs.length) {
      allImgs.map(img => this.createRelativePath(img, 'src'));
    }

    if (allIframes.length) {
      allIframes.map(iframe => this.createRelativePath(iframe, 'src'));
    }

    // Append the modified fragment to the tempNode
    // and assign the innerHTML to the template var
    tempNode.appendChild(bodyFragments);
    this.docs.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(tempNode.innerHTML);

    // API portion of docs json which is output of DocumentationJS
    if (this.docs.api) {
      for (const i in this.docs.api) {
        if (this.docs.api[i]) {
          this.elements.push(this.comments.parse(this.docs.api[i]));
        }
      }
    }

  }

  createRelativePath(el, attr, navigate = false) {
    const absolute = /^((http|https|ftp):\/\/)/;
    if (el.getAttribute(attr)) {
      if (!absolute.test(el.getAttribute(attr))) {
        if (navigate) {
          const relativeLink = el.getAttribute(attr);
          this.router.navigate([`${relativeLink}`]);
        } else {
          const relativeHref = el.getAttribute(attr).replace(/(^\.\/|^\/|.html$)/g, '');
          el.setAttribute(attr, `${this.absolutePath}/${relativeHref}`);
        }
      }
    }
  }

  createVersionPaths(res, urlSegment) {

    let latestVersion = '';

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

    latestVersion = this.versionPaths[1]['label'];
    this.path = urlSegment.join('/');
    this.currentVersion = urlSegment[2];
    this.mapPath = this.urlMapper.map(this.urlParser.parse(this.path));
    this.versionShowWarning(this.currentVersion, latestVersion);

  }

  versionShowWarning(currentVersion, latestVersion) {
    if (currentVersion < latestVersion) {
      this.showWarning = true;
    } else {
      this.showWarning = false;
    }
  }

  relativeLinks(link) {
    const absolute = /^((http|https|ftp):\/\/)/;
    const el = event.target as HTMLElement;
    const href = el.getAttribute('href');
    if (!absolute.test(href)) {
      event.preventDefault();
      if (el.tagName.toLowerCase() === 'a') {
        this.createRelativePath(el, 'href', true);
      }
    }
  }

  ngOnDestroy() {
    this.sidebarNav = '';
  }

  private stopRefreshing() {
    this.loading = false;
  }
}
