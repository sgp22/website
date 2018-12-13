import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { TokenService } from '../../shared/token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'token-table',
  templateUrl: './token-table.component.html',
  providers: [AppSettings, TokenService]
})
export class TokenTableComponent implements OnInit {
  @Input() idsTokenProperties;
  @Input() tokensCategory;
  @Input() sectionClassName;
  @Input() heading;
  @Input() loading;
  public displayAllTokens = false;
  public objectKeys = Object.keys;

  constructor(
    private appSettings: AppSettings,
    private tokenService: TokenService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getIDSTokenProperties(this.appSettings.domainDocsApi, 'ids-identity');
  }

  private getIDSTokenProperties(domain: string, library: string, version: string = 'latest') {
      if (this.tokensCategory === '*') {
        this.displayAllTokens = true;
        this.tokenService
          .getAllTokenData(domain, library, version)
          .subscribe(
            res => {
              this.idsTokenProperties = this.tokenService.combineTokenData(res);
              this.loading = false;
            },
            err => {
              console.log(`No tokens found: ${err}`);
              this.idsTokenProperties = [];
            }
          );
      } else {
        this.displayAllTokens = false;
        this.tokenService
          .getTokenData(domain, library, version)
          .subscribe(
            res => {
              this.idsTokenProperties = this.tokenService.filterCmsTokens(res, this.tokensCategory);
              this.loading = false;
            },
            err => {
              console.log(`No tokens found: ${err}`);
              this.idsTokenProperties = [];
            }
          );
      }
      console.log(this.idsTokenProperties);
  }

}
