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
    
    this.pagesService.getAll()
      .subscribe(
        pages => {
          const items = pages.items;
          items.filter((item) => {
            if(item.meta.slug === slug) {
              this.pagesService.getPage(item.id)
                .subscribe(
                  page => {
                    this.page = page;
                  },
                  err => {
                    console.log(err);
                  }
                )
            }
          })
        },
        err => {
          console.log(err);
        }
    )

  }

}
