import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  providers: [
    UrlParser,
    UrlMapper,
    UrlFetcher,
    Comments
  ]
})
export class DocsContentPageComponent implements OnInit {
  public path = '';
  public mapPath = '';
  public domainPath = DOMAIN_DOCS_API;
  public docs: any;
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
    private comments: Comments
  ) { }

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

      this.urlFetcher.getDocs(`${this.domainPath}/api/docs/${this.library}`)
        .subscribe(res => {

          let latestVersion = '';

          this.versionPaths = res['files'].map(file => {
            const versions = {};
            versions['full'] = file.replace(/docs/, '');
            versions['label'] = file.split('/').slice(-2, -1).join('');
            return versions;
          }).sort((a, b) => {
            return semver.compare(a.label, b.label);
          });

          latestVersion = this.versionPaths[0]['label'];

          this.path = urlSegment.join('/');
          if (this.path.indexOf('latest') !== -1) {
            const latestPath = this.path.replace(/latest/, latestVersion);
            this.mapPath = this.urlMapper.map(this.urlParser.parse(latestPath));
          } else {
            this.mapPath = this.urlMapper.map(this.urlParser.parse(this.path));
          }

          this.urlFetcher.getDocs(`${this.domainPath}/${this.mapPath}`).subscribe(
            (docs: any) => {
              this.elements = [];
              this.docs = docs;
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

          if (urlSegment.length === 4) {
            this.sidebarPath = urlSegment.slice(1, -1).join('/');
          } else {
            if (urlSegment[2] === 'latest') {
              const latestPath = urlSegment.slice(1, 3).join('/');
              this.sidebarPath = latestPath.replace(/latest/, latestVersion);
            } else {
              this.sidebarPath = urlSegment.slice(1, 3).join('/');
            }
          }

          this.selectedVersion = `/${this.sidebarPath}/`;

          this.urlFetcher.getDocs(`${this.domainPath}/api/docs/${this.sidebarPath}/sitemap.json`)
            .subscribe(sidebar => {
              this.sidebarNav = sidebar['sections'];
            });

        });

    });

  }

  onVersionChange(version) {
    this.router.navigate([version]);
  }

}
