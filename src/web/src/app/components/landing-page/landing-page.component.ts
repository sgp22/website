import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  providers: [PagesService]
})
export class LandingPageComponent implements OnInit {
  @Input() page;
  @Input() sidebar;
  public pageContent: any;
  public hasSidebar: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) { }

  ngOnInit() {
    if (this.page) {
      this.pageContent = this.page;
      this.hasSidebar = this.sidebar;
    }
  }

}
