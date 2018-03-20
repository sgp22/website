import { Component, OnInit, Input } from '@angular/core';
import { Token } from '../../shared/token';
import { TokenService } from '../../shared/token.service';

@Component({
  selector: 'token-table',
  templateUrl: './token-table.component.html',
  providers: [TokenService]
})
export class TokenTableComponent implements OnInit {
  @Input() tokenCategory;
  @Input() sectionClassName;
  public domainPath = DOMAIN_DOCS_API;
  public idsTokenProperties = {};

  constructor(
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getIDSTokenProperties(this.domainPath, 'ids-web');
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
