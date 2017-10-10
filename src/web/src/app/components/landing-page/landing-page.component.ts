import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [PagesService]
})
export class LandingPageComponent implements OnInit {

  public page: any;
  public children: any;
  public pageType = 'home.LandingPage';  

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
        },
        (err) => {
          console.log(err);
        }
    );

  }

}
