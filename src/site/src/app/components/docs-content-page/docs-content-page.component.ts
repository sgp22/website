import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsService } from './docs.service';
import { LibraryService } from '../../shared/library.service';
import { HelpersService } from '../../shared/helpers.service';
import { DomSanitizer } from '@angular/platform-browser';
import { zip } from 'rxjs';
import { PagesService } from 'src/app/shared/pages.service';

interface TocItems {
  label: string;
  id: string;
}

@Component({
  selector: 'docs-content-page',
  templateUrl: './docs-content-page.component.html',
  styleUrls: ['./docs-content-page.component.scss']
})
export class DocsContentPageComponent implements OnInit {
  public params: any;
  public docs: any;
  public absolutePath: string;
  public library: string;
  public component: string;
  public currentVersion: string;
  public tocItems: TocItems[] = [];
  public bodyTitles: any;
  public apiTitles: any;
  public loading: boolean;
  public showWarning: boolean;
  public currentSection: string;
  public scrollOffset = 150;

  constructor(
    private docsService: DocsService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private h: HelpersService,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.absolutePath = `code/${params.library}/${params.version}`;
      this.library = `${params.library}`;
      this.currentVersion = `${params.version}`;

      if (params.component) {
        this.params = `${params.library}/${params.version}/docs/${params.component}.json`;
        this.component = `${params.component}`;
      } else {
        this.params = `${params.library}/${params.version}/docs/index.json`;
      }

      const source$ = zip(
        this.libraryService.loadAllLibraryVersions(this.library),
        this.docsService.loadDocs(this.params)
      );

      source$.subscribe( ([allLibraries, docData]) => {
        let latestVersion = '';
        if (allLibraries instanceof Array && allLibraries.length) {
          latestVersion = allLibraries[0];
        }

        if (this.currentVersion === 'latest') {
          this.currentVersion = latestVersion;
        }

        this.versionShowWarning(this.currentVersion, latestVersion);

        this.docs = docData;

        if (this.docs.api) {
          this.docs.apiTrustedHtml = this.sanitizer.bypassSecurityTrustHtml(this.docs.api);
        }

        if (docData['demo']) {
          if (docData['demo'].pages) {
            docData['demo'].pages.forEach(page => {
              if (page.slug) {
                const initialVariant = this.pagesService.getThemeVariant() === null ? 'light' : this.pagesService.getThemeVariant();
                page.githubUrl = this.createGithubUrl(page.slug);
                page.url = this.createDemoUrl(page.slug, false, initialVariant);
                this.pagesService.themeVariant$
                  .subscribe(variant => {
                    this.pagesService.setThemeVariant(variant);
                    this.createDemoUrl(page.slug, false, this.pagesService.getThemeVariant());
                  });
              }
            });
          }

          if (docData['demo'].embedded) {
            docData['demo'].embedded.forEach(page => {
              const initialVariant = this.pagesService.getThemeVariant() === null ? 'light' : this.pagesService.getThemeVariant();
              page.githubUrl = this.createGithubUrl(page.slug);
              page.url = this.createDemoUrl(page.slug);
              page.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.createDemoUrl(page.slug, true, initialVariant));
              this.pagesService.themeVariant$
                .subscribe(variant => {
                  this.pagesService.setThemeVariant(variant);
                  page.url = this.createDemoUrl(page.slug, true, this.pagesService.getThemeVariant());
                  page.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.createDemoUrl(page.slug, true, variant));
                });
            });
          }
        }

        this.handleRelativeLinks(this.docs);
        this.buildToc();
        this.loading = false;

        if (!this.loading) {
          setTimeout(() => {
            this.h.pageLoadToSection();
          }, 200);
        }

      },
      err => {
        if (err.error.error.code === '404') {
          this.router.navigate(['/404']);
        }
      });

      (<any>window).ga('set', {
        'dimension2': (this.component ? this.component : 'n/a'),
        'dimension4': `${this.library}`,
        'dimension5': `${this.currentVersion}`,
        'dimension6': (this.currentVersion === 'latest' ? 'yes' : 'no'),
      });
      (<any>window).ga('send', 'pageview');
    });
  }

  handleRelativeLinks(docs) {
    // Relative Link support.
    // tempNode needs to be created in order to convert
    // the fragment back to a string
    const tempNode = document.createElement('div');
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
    docs.bodyTrustedHtml = this.sanitizer.bypassSecurityTrustHtml(tempNode.innerHTML);
  }

  createRelativePath(el, attr, navigate = false) {
    const absolute = /^((http|https|ftp):\/\/)/;
    if (el.getAttribute(attr)) {
      if (!absolute.test(el.getAttribute(attr))) {
        if (navigate) {
          const relativeLink = el.getAttribute(attr);
          const pathArray = relativeLink.split('/');
          if (pathArray[1] === 'code' && pathArray[4] === 'demo') {
            // pass, behave like normal following a click behavior
          } else {
            event.preventDefault();
            this.router.navigate([`${relativeLink}`]);
          }
        } else {
          const relativeHref = el.getAttribute(attr).replace(/(^\.\/|.html$)/g, '');
          const pathArray = relativeHref.split('/');
          if (pathArray.includes('demo')) {
            el.setAttribute('target', '_blank');
          }
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

  relativeLinks(link) {
    const absolute = /^((http|https|ftp):\/\/)/;
    const el = event.target as HTMLElement;
    const href = el.getAttribute('href');
    if (!absolute.test(href)) {
      if (el.tagName.toLowerCase() === 'a') {
        this.createRelativePath(el, 'href', true);
      }
    }
  }

  createDemoUrl(slug: string, embeddedLayout: boolean = false, themeVariant = 'light') {
    let url = `${this.absolutePath}/demo/components/${this.component}/${slug}`;
    if (embeddedLayout) {
      url += `?layout=nofrills&variant=${themeVariant}&theme=uplift`;
    }
    return url;
  }

  createGithubUrl(slug: string) {
    const repoName = this.library.replace('ids-', '');
    let url = `https://github.com/infor-design/${repoName}/blob/`;
    url += `${this.currentVersion}/app/views/components/${this.component}/${slug}.html`;
    return url;
  }

  buildToc() {
    this.tocItems = [];
    const regex = new RegExp(/(<\/?h2 id=(.[^(?:'|")]+(?:'|")>((.|\n)*?<\/h2>)))/, 'ig');
    if (this.docs.body) {
      this.bodyTitles = this.docs.body.match(regex);
    }
    if (this.docs.api) {
      this.apiTitles = this.docs.api.match(regex);
    } else {
      this.apiTitles = null;
    }
    if (this.apiTitles) {
      this.apiTitles.map(item => this.h.createTocItems(item, this.tocItems));
    }
    if (this.bodyTitles) {
      this.bodyTitles.map(item => this.h.createTocItems(item, this.tocItems));
    }
  }

  versionShowWarning(currentVersion, latestVersion) {
    if (currentVersion < latestVersion) {
      this.showWarning = true;
    } else {
      this.showWarning = false;
    }
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }
}
