import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [PagesService]
})
export class PageComponent implements OnInit {

  public page: any;
  public children: any;
  public loading: boolean;

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
    
    this.pagesService.getPageWithNav(slug)
      .subscribe(
        (res) => { 
          this.getPage(res);
        },
        (err) => {
          console.log(err);
        }
    );

    this.router.events
      .filter((e) => e instanceof NavigationEnd)
      .switchMap(e => this.pagesService.getPageWithNav(slug))
        .subscribe(
          (res) => { 
            this.getPage(res);
          },
          (err) => {
            console.log(err);
          }
      );
      
  }

  getPage(res) {
    this.page = res[0];
    this.children = this.page.children.items;
  }

}
