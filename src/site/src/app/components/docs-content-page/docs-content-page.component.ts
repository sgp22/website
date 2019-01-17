import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }from '@angular/router';
import { DocsService } from './docs.service';
import { LibraryService } from '../../shared/library.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as semver from 'semver';

@Component({
  selector: 'app-docs-content-page',
  templateUrl: './docs-content-page.component.html',
  styleUrls: ['./docs-content-page.component.css']
})
export class DocsContentPageComponent implements OnInit {
  public params: any;
  public docs: any;
  public absolutePath: string;
  public library: string;
  public component: string;
  public currentVersion: string;
  public versionPaths: any;
  public loading: boolean;

  constructor(
    private docsService: DocsService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {

      this.absolutePath = `code/${params.library}/${params.version}`;
      this.library = `${params.library}`;
      this.currentVersion = `${params.version}`;

      if (params.component) {
        this.params = `${params.library}/${params.version}/docs/${params.component}.json`;
        this.component = `${params.component}`;
      } else {
        this.params = `${params.library}/${params.version}/docs/index.json`;
      }

      this.libraryService.loadAllLibraryVersions(this.library)
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
            full: `/${this.library}/latest/`,
            label: `Latest (${this.versionPaths[0]['label']})`
          });

          let latestVersion = this.versionPaths[1]['label'];
          if (this.currentVersion === 'latest') {
            this.currentVersion = latestVersion;
          } else {
            this.currentVersion = this.currentVersion;
          }
        })

      this.docsService.loadDocs(this.params)
        .subscribe(res => {

          this.docs = res;
          this.handleRelativeLinks(this.docs);

          if (res['demo']) {
            if (res['demo'].pages) {
              res['demo'].pages.forEach(page => {
                page.githubUrl = this.createGithubUrl(page.slug);
                page.url = this.createDemoUrl(page.slug);
              });
            }

            if (res['demo'].embedded) {
              res['demo'].embedded.forEach(page => {
                page.githubUrl = this.createGithubUrl(page.slug);
                page.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.createDemoUrl(page.slug, true));
              });
            }
          }

          this.loading = false;
        });

    })
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

  createDemoUrl(slug: string, embeddedLayout: boolean = false) {
    let url = `${this.absolutePath}/demo/components/${this.component}/${slug}?font=source-sans`;
    if (embeddedLayout) {
      url += '&layout=embedded';
    }
    return url;
  }

  createGithubUrl(slug: string) {
    const repoName = this.library.replace('ids-', '');
    let url = `https://github.com/infor-design/${repoName}/blob/`;
    url += `${this.currentVersion}/app/views/components/${this.component}/${slug}.html`;
    return url;
  }

}
