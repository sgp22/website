import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-core-content-page',
  templateUrl: './core-content-page.component.html',
  styleUrls: ['./core-content-page.component.css'],
  providers: [PagesService]
})
export class CoreContentPageComponent implements OnInit {

  public page: any;
  public children: any;
  public pageType = 'home.CoreContentPage';  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {

    let slug;
    this.route.params.forEach((params: Params) => {
      slug = params['slug'];
    });
    
    this.pagesService.getPageWithNav(slug, this.pageType)
      .subscribe(
        (res) => { 
          this.page = res[0];
          this.children = this.page.children.items;
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
    );

  }
}
