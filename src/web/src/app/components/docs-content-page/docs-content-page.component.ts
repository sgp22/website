import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

import { AppSettings } from '../../app.settings';

import { UrlParser } from '../../shared/urlParser.service';
import { UrlMapper } from '../../shared/urlMapper.service';
import * as semver from 'semver';

import { DocService } from '../../shared/doc.service';
import { LibraryService } from '../../shared/library.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

interface TocItems {
  label: string;
  id: string;
}

@Component({
  selector: 'app-docs-content-page',
  templateUrl: './docs-content-page.component.html',
  providers: [AppSettings, UrlParser, UrlMapper, DocService, LibraryService]
})
export class DocsContentPageComponent implements OnInit, OnDestroy {
  public path = '';
  public basePath = '';
  public mapPath = '';
  public absolutePath = '';
  public docs: any;
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
  public component;
  public tocItems: TocItems[] = [];
  public bodyTitles;
  public apiTitles;
  @HostBinding('class.ids-row--offset-xl-2')
  @HostBinding('class.ids-row--offset-sm-3')
  @HostBinding('class.ids-row--col-sm-9')
  @HostBinding('class.ids-row--col-xl-10') grid = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appSettings: AppSettings,
    private urlParser: UrlParser,
    private urlMapper: UrlMapper,
    private sanitizer: DomSanitizer,
    private docService: DocService,
    private libraryService: LibraryService,
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
      this.loading = true;

      this.libraryService
        .getAllLibraryVersionPaths(this.library)
        .subscribe(res => {

          this.createVersionPaths(res, urlSegment);

          this.docService
            .getDoc(`${this.appSettings.domainDocsApi}/${this.mapPath}`)
            .subscribe(
              (docs: any) => {
                if (docs === '0') {
                  this.notFound = true;
                  return;
                }
                this.notFound = false;
                this.docs = docs;

                if (docs.api) {
                  this.docs.apiTrustedHtml = this.sanitizer.bypassSecurityTrustHtml(docs.api);
                }

                if (docs.demo) {
                  if (docs.demo.pages) {
                    docs.demo.pages.forEach(page => {
                      page.githubUrl = this.createGithubUrl(page.slug);
                      page.url = this.createDemoUrl(page.slug);
                    });
                  }

                  if (docs.demo.embedded) {
                    docs.demo.embedded.forEach(page => {
                      page.githubUrl = this.createGithubUrl(page.slug);
                      page.url = this.createDemoUrl(page.slug, true);
                      page.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(page.url);
                    });
                  }
                }

                this.handleRelativeLinks(docs);
                this.buildToc();
              },
              (err) => {
                this.stopRefreshing();
              },
              () => {
                this.loadingBar.complete();
                this.stopRefreshing();
                window.scrollTo(0, 0);
              }
            );
        });

      (<any>window).ga('set', {
        'dimension2': (segment[3] ? segment[3].path : 'n/a'),
        'dimension4': `${segment[1].path}`,
        'dimension5': `${segment[2].path}`,
        'dimension6': (segment[2].path === 'latest' ? 'yes' : 'no'),
      });
      (<any>window).ga('send', 'pageview');
    });
  }

  createTocItems(item) {
    const regexId = new RegExp(/id=(?:'|")(.*?)(?:'|")/g);
    const regexLabel = new RegExp(/(<\/?h2 id=(.[^(?:'|")]+(?:'|")>((.|\n)*?<\/h2>)))/, 'ig');
    const ids = item.match(regexId);
    const id = ids[0].replace(/id=(?:'|")/g, '').replace(/(?:'|")$/, '');
    const labels = item.match(regexLabel);
    const label = labels[0].replace(/(<\/?h2 id=(.[^(?:'|")]+(?:'|")>))/, '').replace(/<\/h2>/, '');
    this.tocItems.push({
      label: label,
      id: id
    });
  }

  buildToc() {
    this.tocItems = [];
    const regex = new RegExp(/(<\/?h2 id=(.[^(?:'|")]+(?:'|")>((.|\n)*?<\/h2>)))/, 'ig');
    if (this.docs.body) {
      this.bodyTitles = this.docs.body.match(regex);
    }
    if (this.docs.api) {
      this.apiTitles = this.docs.api.match(regex);
    }
    if (this.apiTitles) {
      this.apiTitles.map(item => this.createTocItems(item));
    }
    if (this.bodyTitles) {
      this.bodyTitles.map(item => this.createTocItems(item));
    }
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
    this.docs.bodyTrustedHtml = this.sanitizer.bypassSecurityTrustHtml(tempNode.innerHTML);
  }

  createRelativePath(el, attr, navigate = false) {
    const absolute = /^((http|https|ftp):\/\/)/;
    if (el.getAttribute(attr)) {
      if (!absolute.test(el.getAttribute(attr))) {
        if (navigate) {
          const relativeLink = el.getAttribute(attr);
          const pathArray = relativeLink.split('/');
          if (pathArray[1] === 'code' && pathArray[4] === 'demo') {
            window.open(`${window.location.origin}${relativeLink}`, '_blank');
          } else {
            this.router.navigate([`${relativeLink}`]);
          }
        } else {
          const relativeHref = el.getAttribute(attr).replace(/(^\.\/|.html$)/g, '');
          if (relativeHref.substring(0, 1) === '/') {
            // Relative to the root of the domain
            el.setAttribute(attr, `${relativeHref}`);
          } else {
            // Relative to the current path
            el.setAttribute(attr, `${this.absolutePath}/${relativeHref}`);
          }
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

    if (this.currentVersion === 'latest') {
      this.selectedVersionNumber =  latestVersion;
    } else {
      this.selectedVersionNumber = this.currentVersion;
    }

  }

  createDemoUrl(slug: string, noFrillsDemo: boolean = false) {
    let url = `${this.absolutePath}/demo/components/${this.element}/${slug}?font=source-sans`;
    if (noFrillsDemo) {
      url += '&nofrills=true';
    }
    return url;
  }

  createGithubUrl(slug: string) {
    const repoName = this.library.replace('ids-', '');
    let url = `https://github.com/infor-design/${repoName}/blob/`;
    url += `${this.selectedVersionNumber}/app/views/components/${this.element}/${slug}.html`;
    return url;
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
