import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { UrlParser } from '../../shared/urlParser.service';
import { UrlMapper } from '../../shared/urlMapper.service';
import { UrlFetcher } from '../../shared/urlFetcher.service';

@Component({
  selector: 'app-docs-content-page',
  templateUrl: './docs-content-page.component.html',
  providers: [
    UrlParser,
    UrlMapper,
    UrlFetcher,
  ]
})
export class DocsContentPageComponent implements OnInit, AfterViewInit {

  public path = '';
  public mapPath = '';
  public domainPath = 'http://docs-site-staging.us-east-1.elasticbeanstalk.com';
  public docs: any;
  public section: any;
  public sidebar: any = true;
  public sidebarPath = '';
  public sidebarNav: any;
  public loading = true;
  public notFound = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private urlParser: UrlParser,
    private urlMapper: UrlMapper,
    private urlFetcher: UrlFetcher
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {

    this.route.url
      .subscribe(
        segment => {
          this.section = segment[0].path;
        }
      )

    const urlSegment = [];
    this.route.url.subscribe(segment => {

      for (let i = 0; i < segment.length; i++) {
        urlSegment[i] = segment[i].path;
      }

      this.path = urlSegment.join('/');
      this.mapPath = this.urlMapper.map(this.urlParser.parse(this.path));
      this.urlFetcher.getDocs(`${this.domainPath}/${this.mapPath}`).subscribe(
        (docs: any) => {
          this.docs = docs;
          this.loading = false;
          this.notFound = false;
        },
        err => {
          this.notFound = true;
          // redirect?! Load 404 page
          console.error('Wrong endpoint? 400?', err);
        }
      );

      this.sidebarPath = urlSegment.slice(1, -1).join('/');
      console.log(this.sidebarPath);
      this.urlFetcher.getDocs(`${this.domainPath}/api/docs/${this.sidebarPath}/sitemap.json`)
        .subscribe(
          res => {
            this.sidebarNav = res['Sections'];
          }
        )

    });

  }

}
