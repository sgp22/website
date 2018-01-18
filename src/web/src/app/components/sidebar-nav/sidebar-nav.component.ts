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
  @Input() section;
  @Input() hasGrandchildren;
  public sidebarNav: any;
  public sectionTitle: any;
  public grandChildren: boolean;

  constructor(
    private pagesService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

    this.sidebarNav = this.sidebarData;
    this.sectionTitle = this.section;
    this.grandChildren = this.hasGrandchildren;

  }

}
