import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { Token } from '../../shared/token';
import { TokenService } from '../../shared/token.service';

@Component({
  selector: 'app-element-page',
  templateUrl: './element-page.component.html',
  providers: [PagesService, TokenService]
})

export class ElementPageComponent implements OnInit {
  @Input() page;
  public pageContent;
  public domainPath = DOMAIN_DOCS_API;
  public tokens;
  public idsTokenProperties: {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {

    this.pageContent = this.page;
    this.checkModifierTokens();
    this.getIDSTokenProperties(this.domainPath, 'ids-web');

  }

  private checkModifierTokens() {
    this.tokens = this.pageContent.modifiers.filter(modifier => modifier.value.token === "" ? false : true);
  }

  private getIDSTokenProperties(domain: string, library: string, version: string = 'latest') {
    this.tokenService
      .getTokenData(domain, library, version)
      .subscribe(
        res => { this.idsTokenProperties = this.tokenService.groupTokensByCategory(res) },
        err => {
          console.log(`No tokens found: ${err}`);
          this.idsTokenProperties = [];
        }
      );
  }

}
