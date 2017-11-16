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
            if (item.meta.slug === this.section) {
              this.sidebarNav = item.meta.children.children.sort((thisChild, nextChild) => {
                item.meta.children.children.map(child => {
                  child.children.sort((thisGrandChild, nextGrandchild) => {
                    return thisGrandChild.title > nextGrandchild.title ? 1 : -1;
                  });
                });
                return thisChild.menu_order > nextChild.menu_order ? 1 : -1;
              });
            }
          });
        }
      );

  }

}
