import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../../shared/token.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HelpersService } from '../../shared/helpers.service';

@Component({
  selector: 'token-table',
  templateUrl: './token-table.component.html',
  providers: [TokenService]
})
export class TokenTableComponent implements OnInit {
  @Input() idsTokenProperties;
  @Input() tokensCategory;
  @Input() sectionClassName;
  @Input() heading;
  @Input() loading;
  public displayAllTokens = false;
  public objectKeys = Object.keys;
  public apiUrl = environment.apiUrl;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private h: HelpersService
  ) { }

  ngOnInit() {
    this.getIDSTokenProperties(`${this.apiUrl}`, 'ids-identity');
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
          },
          () => {
            setTimeout(() => {
              this.h.pageLoadToSection();
            });
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
          },
          () => {
            setTimeout(() => {
              this.h.pageLoadToSection();
            });
          }
        );
    }
  }
}

