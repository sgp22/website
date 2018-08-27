import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Token } from '../../shared/token';
import { TokenService } from '../../shared/token.service';

@Component({
  selector: 'modifiers-table',
  templateUrl: './modifiers-table.component.html',
  providers: [AppSettings, TokenService]
})
export class ModifiersTableComponent implements OnInit {
  @Input() modifiers;
  public tokens;
  public modifiersTokens = [];

  constructor(
    private appSettings: AppSettings,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getIDSTokenProperties(this.appSettings.domainDocsApi, 'ids-identity');
    this.checkModifierTokens();
  }

  private checkModifierTokens() {
    if (this.modifiers) {
      this.tokens = this.modifiers.filter(modifier => modifier.value.token === '' || modifier.value.token === null ? false : true);
    }
  }

  private getIDSTokenProperties(domain: string, library: string, version: string = 'latest') {
    this.tokenService
      .getTokenData(domain, library, version)
      .subscribe(
        res => this.modifiersTokens = res.props,
        err => {
          console.log(`No tokens found: ${err}`);
          this.modifiersTokens = [];
        }
      );
  }

}
