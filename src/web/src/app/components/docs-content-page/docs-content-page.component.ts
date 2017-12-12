import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { UrlParser } from '../../shared/urlParser.service';
import { UrlMapper } from '../../shared/urlMapper.service';
import { UrlFetcher } from '../../shared/urlFetcher.service';
import { Comments } from '../../shared/comments.service';
import * as semver from 'semver';

@Component({
  selector: 'app-docs-content-page',
  templateUrl: './docs-content-page.component.html',
  providers: [UrlParser, UrlMapper, UrlFetcher, Comments]
})
export class DocsContentPageComponent implements OnInit {
  public path = '';
  public mapPath = '';
  public domainPath = DOMAIN_DOCS_API;
  public docs: any;
  public trustedHtml: any;
  public section: any;
  public element: any;
  public sidebar: any = true;
  public sidebarPath = '';
  public sidebarNav: any;
  public versionPaths: any;
  public library = '';
  public selectedVersion = '';
  public loading = true;
  public notFound = false;
  public elements = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private urlParser: UrlParser,
    private urlMapper: UrlMapper,
    private urlFetcher: UrlFetcher,
    private comments: Comments,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.url.subscribe(segment => {
      this.section = segment[0].path;
      if (segment.length === 4) {
        this.element = segment.slice(-1)[0].path;
      } else {
        this.element = null;
      }
    });

    const urlSegment = [];

    this.route.url.subscribe(segment => {
      for (let i = 0; i < segment.length; i++) {
        urlSegment[i] = segment[i].path;
      }

      if (urlSegment.length === 4) {
        this.library = urlSegment.slice(1, -2).join('');
      } else {
        this.library = urlSegment.slice(1, -1).join('');
      }

      this.urlFetcher
        .getDocs(`${this.domainPath}/api/docs/${this.library}`)
        .subscribe(res => {
          let latestVersion = '';

          this.versionPaths = res['files']
            .map(file => {
              const versions = {};
              versions['full'] = file.replace(/docs/, '');
              versions['label'] = file
                .split('/')
                .slice(-2, -1)
                .join('');
              return versions;
            })
            .sort((a, b) => {
              return semver.compare(a.label, b.label);
            })
            .reverse();

          latestVersion = this.versionPaths[0]['label'];

          this.path = urlSegment.join('/');
          if (this.path.indexOf('latest') !== -1) {
            const latestPath = this.path.replace(/latest/, latestVersion);
            this.mapPath = this.urlMapper.map(this.urlParser.parse(latestPath));
          } else {
            this.mapPath = this.urlMapper.map(this.urlParser.parse(this.path));
          }

          this.urlFetcher
            .getDocs(`${this.domainPath}/${this.mapPath}`)
            .subscribe(
              (docs: any) => {

                this.elements = [];
                this.docs = docs;

                /*
                  Relative Link support.
                  tempNode needs to be created in order to convert
                  the fragment back to a string
                */

                const tempNode = document.createElement('div');
                const absolute = /^((http|https|ftp):\/\/)/;
                const bodyFragments = document.createRange().createContextualFragment( docs.body );
                const allHrefs = Array.from( bodyFragments.querySelectorAll('a') );
                const allImgs = Array.from( bodyFragments.querySelectorAll('img') );
                const allIframes = Array.from( bodyFragments.querySelectorAll('iframe') );

                /*
                  Modify relative hrefs, img src and iframe src.
                */

                if (allHrefs.length) {
                  allHrefs.map((a) => {
                    const href = a.getAttribute('href');
                    if (!absolute.test(href)) {
                      const relativeHref = href.replace(/(^\.\/|.html$)/g, '');
                      a.setAttribute('href', `${this.path}/${relativeHref}`);
                    }
                  });
                }

                if (allImgs.length) {
                  allImgs.map((img) => {
                    const src = img.getAttribute('src');
                    if (!absolute.test(src)) {
                      const relativeSrc = src.replace(/(^\.\/)/g, '');
                      img.setAttribute('src', `${this.path}/${relativeSrc}`);
                    }
                  });
                }

                if (allIframes.length) {
                  allIframes.map((iframe) => {
                    const src = iframe.getAttribute('src');
                    if (!absolute.test(src)) {
                      const relativeSrc = src.replace(/(^\.\/)/g, '');
                      iframe.setAttribute('src', `${this.path}/${relativeSrc}`);
                    }
                  });
                }

                /*
                  Append the modified fragment to the tempNode
                  and assign the innerHTML to the template var
                */

                tempNode.appendChild(bodyFragments);
                this.docs.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(tempNode.innerHTML);

                /*
                  API portion of docs json which is output of DocumentationJS
                */
                if (this.docs.api) {
                  for (const i in this.docs.api) {
                    if (this.docs.api[i]) {
                      this.elements.push(this.comments.parse(this.docs.api[i]));
                    }
                  }
                }

                this.loading = false;
                this.notFound = false;

              },
              err => {
                this.notFound = true;
              }
            );

          if (urlSegment[2] === 'latest') {
            const latestPath = urlSegment.slice(1, 3).join('/');
            this.sidebarPath = latestPath.replace(/latest/, latestVersion);
          } else {
            if (urlSegment.length === 4) {
              this.sidebarPath = urlSegment.slice(1, -1).join('/');
            } else {
              this.sidebarPath = urlSegment.slice(1, 3).join('/');
            }
          }

          this.selectedVersion = `/${this.sidebarPath}/`;
          this.urlFetcher
            .getDocs(`${this.domainPath}/api/docs/${this.sidebarPath}/sitemap.json`)
            .subscribe(sidebar => {
              this.sidebarNav = sidebar['sections'];
            });
        });
    });
  }

  onVersionChange(version) {
    this.router.navigate([version]);
  }

  relativeLinks(link) {
    event.preventDefault();
    const el = event.target as HTMLElement;
    const href = el.getAttribute('href');
    const absolute = /^((http|https|ftp):\/\/)/;
    if (el.tagName.toLowerCase() === 'a') {
      if (!absolute.test(href)) {
        const relativeLink = href;
        this.router.navigate([`${relativeLink}`]);
      }
    }
  }

}
