import { Component, OnInit, Input } from '@angular/core';
import * as validUrl from 'valid-url';

@Component({
  selector: 'sf-full-width',
  templateUrl: './sf-full-width.component.html'
})
export class SfFullWidthComponent implements OnInit {
  @Input() flexible_content: any;
  @Input() title: string;
  @Input() content: string;
  @Input() ctaText: string;
  @Input() ctaLink: string;
  @Input() heroImage: string;
  @Input() heroImageTitle: string;
  @Input() backgroundImage: string;
  @Input() backgroundColor: string;
  @Input() invertTextColor: string;
  @Input() textAlign: string;
  @Input() sidebar: boolean;
  public ctaIsExternalUrl: boolean;

  constructor() { }

  ngOnInit() {
    if (validUrl.isUri(this.ctaLink)) {
      this.ctaIsExternalUrl = true;
    }
  }

}
