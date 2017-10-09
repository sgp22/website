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
  public streamfields: any;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
    this.pagesService.getAll()
      .subscribe((pages) => {
        let homepage;
        pages.items.filter((page) => {
          if(page.meta.slug === 'home') {
            this.page = page;
          }
        })
      })
  }

}
