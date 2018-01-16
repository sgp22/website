import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  providers: [PagesService]
})
export class SidebarNavComponent implements OnInit {

  @Input() sidebarData;
  @Input() template;
  public sidebarNav: any;
  public sidebar;
  public section;

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

    this.sidebarNav = this.sidebarData;

  }

}
