import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-element-page',
  templateUrl: './element-page.component.html',
  providers: [PagesService]
})

export class ElementPageComponent implements OnInit {
  @Input() page;
  public pageContent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) {}

  ngOnInit() {
    this.pageContent = this.page;
  }

}
