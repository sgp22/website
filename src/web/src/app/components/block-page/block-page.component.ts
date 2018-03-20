import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-block-page',
  templateUrl: './block-page.component.html',
  providers: [PagesService]
})

export class BlockPageComponent implements OnInit {
  @Input() page;
  public pageContent;
  public tokens;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) { }

  ngOnInit() {

    this.pageContent = this.page;
    this.tokens = this.pageContent.modifiers.filter(modifier => modifier.value.token === "" ? false : true);

  }

}
