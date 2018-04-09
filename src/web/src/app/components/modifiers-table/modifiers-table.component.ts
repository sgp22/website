import { Component, OnInit, Input } from '@angular/core';
import { Token } from '../../shared/token';
import { TokenService } from '../../shared/token.service';

@Component({
  selector: 'modifiers-table',
  templateUrl: './modifiers-table.component.html',
  providers: [TokenService]
})
export class ModifiersTableComponent implements OnInit {
  @Input() modifiers;
  public tokens;
  public domainPath = DOMAIN_DOCS_API;
  public modifiersTokens = [];

  constructor(
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getIDSTokenProperties(this.domainPath, 'ids-css');
    this.checkModifierTokens();
  }

  private checkModifierTokens() {
    this.tokens = this.modifiers.filter(modifier => modifier.value.token === '' || modifier.value.token === null ? false : true);
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
