import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css'],
  providers: [PagesService]
})
export class SidebarNavComponent implements OnInit, AfterViewInit {

  @Input() sidebar: boolean;
  // @Input() sidebarNav: any;
  public sidebarNav: any;
  public section: any;

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {

    this.route.url
      .subscribe(
        section => {
          this.section = section[0].path;
        }
      );

    this.pagesService.getAll()
      .subscribe(
        res => {
          res['items'].filter((item) => {
            if (item.title.toLowerCase() === this.section) {
              this.sidebarNav = item.meta.children.children;
            }
          });
        }
      )

  }

}
