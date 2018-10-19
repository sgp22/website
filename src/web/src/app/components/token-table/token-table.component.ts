import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Token } from '../../shared/token';
import { TokenService } from '../../shared/token.service';
import testTokenData from '../../shared/test.token.data';

@Component({
  selector: 'token-table',
  templateUrl: './token-table.component.html',
  providers: [AppSettings, TokenService]
})
export class TokenTableComponent implements OnInit {
  @Input() idsTokenProperties;
  @Input() sectionClassName;
  @Input() version;
  @Input() loading;
  @Input() library;
  @Input() element;
  public tokensCategory = 'button';

  constructor(
    private appSettings: AppSettings,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getIDSTokenProperties(this.appSettings.domainDocsApi, this.library);
  }

  private getIDSTokenProperties(domain: string, library: string, version: string = 'latest') {
    this.idsTokenProperties = this.tokenService.groupTokensByCategory(testTokenData);
    this.loading = false;
    console.log(this.idsTokenProperties);
    // this.tokenService
    //   .getTokenData(domain, library, version)
    //   .subscribe(
    //     res => {
    //       this.tokenService.groupTokensByCategory(testTokenData);
    //       this.loading = false;
    //     },
    //     err => {
    //       console.log(`No tokens found: ${err}`);
    //       this.idsTokenProperties = [];
    //     }
    //   );
  }

}
