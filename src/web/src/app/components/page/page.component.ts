import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [PagesService]
})
export class PageComponent implements OnInit {

  public page: any;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {

    let slug;
    this.route.params.forEach((params: Params) => {
      slug = params['slug'];
    })
  
    this.pagesService.getPage(slug)
      .subscribe(
        page => {
          const items = page.items;
          items.map((item) => {
            this.page = item;
          })
        },
        err => {
          console.log(err);
        }
      )
      
  }

}
