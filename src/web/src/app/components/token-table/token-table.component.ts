import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { TokenService } from '../../shared/token.service';

@Component({
  selector: 'token-table',
  templateUrl: './token-table.component.html',
  providers: [AppSettings, TokenService]
})
export class TokenTableComponent implements OnInit {
  @Input() idsTokenProperties;
  @Input() tokensCategory;
  @Input() sectionClassName;
  @Input() loading;
  @Input() cms;

  constructor(
    private appSettings: AppSettings,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getIDSTokenProperties(this.appSettings.domainDocsApi, 'ids-identity');
  }

  private getIDSTokenProperties(domain: string, library: string, version: string = 'latest') {
      this.tokenService
        .getTokenData(domain, library, version)
        .subscribe(
          res => {
            console.log(this.cms);
            if (this.cms) {
              this.idsTokenProperties = this.tokenService.cmsTokens(res);
              console.log(this.idsTokenProperties);
            }else {
              this.idsTokenProperties = this.tokenService.groupTokensByCategory(res);
            }
            this.loading = false;
          },
          err => {
            console.log(`No tokens found: ${err}`);
            this.idsTokenProperties = [];
          }
        );
  }

}
