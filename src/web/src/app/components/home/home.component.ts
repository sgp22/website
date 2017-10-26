import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PagesService]
})
export class HomeComponent implements OnInit {

  public slugs: any;
  public page: any;
  public docs: any;
  public docsBody: any;
  public streamfields: any;
  public hideGlobalNav: any = true;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
    this.pagesService.getAll()
      .subscribe((pages: any) => {
        pages.items.filter((page) => {
          if (page.meta.slug === 'home') {
            this.page = page;
          }
        });
      });
  }

}
