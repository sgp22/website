import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { UrlParser } from '../../shared/urlParser.service';
import { UrlMapper} from '../../shared/urlMapper.service';
import { UrlFetcher } from '../../shared/urlFetcher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PagesService, UrlParser, UrlMapper, UrlFetcher]
})
export class HomeComponent implements OnInit {

  public slugs: any;
  public page: any;
  public streamfields: any;
  public hideGlobalNav: any = true;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private urlParser: UrlParser,
    private urlMapper: UrlMapper,
    private urlFetcher: UrlFetcher
  ) { }

  ngOnInit() {
    const urlTree = this.urlParser.parse('/develop/tempo/1.0.0/adaptive');
    const path = this.urlMapper.map(urlTree);
    const docsUrl = `http://docs-site-staging.us-east-1.elasticbeanstalk.com`;
    this.urlFetcher.getDocs(`${docsUrl}${path}`);
    this.pagesService.getAll()
      .subscribe((pages) => {
        pages.items.filter((page) => {
          if (page.meta.slug === 'home') {
            this.page = page;
          }
        });
      });
  }

}
