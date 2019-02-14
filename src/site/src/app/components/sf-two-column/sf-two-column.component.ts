import { Component, OnInit, Input } from '@angular/core';
import * as validUrl from 'valid-url';

@Component({
  selector: 'sf-two-column',
  templateUrl: './sf-two-column.component.html'
})
export class SfTwoColumnComponent implements OnInit {
  @Input() col1Title: string;
  @Input() col1Content: string;
  @Input() col1CtaText: string;
  @Input() col1CtaLink: string;
  @Input() col1HeroImage: string;
  @Input() col1HeroImageTitle: string;
  @Input() col1BackgroundImage: string;
  @Input() col1BackgroundColor: string;
  @Input() col1InvertTextColor: string;
  @Input() col1TextAlign: string;
  @Input() col2Title: string;
  @Input() col2Content: string;
  @Input() col2CtaText: string;
  @Input() col2CtaLink: string;
  @Input() col2HeroImage: string;
  @Input() col2HeroImageTitle: string;
  @Input() col2BackgroundImage: string;
  @Input() col2BackgroundColor: string;
  @Input() col2InvertTextColor: string;
  @Input() col2TextAlign: string;
  @Input() sidebar: boolean;
  @Input() index: number;
  public col1CtaIsExternalUrl: boolean;
  public col2CtaIsExternalUrl: boolean;

  constructor() { }

  ngOnInit() {
    if (validUrl.isUri(this.col1CtaLink)) {
      this.col1CtaIsExternalUrl = true;
    }

    if (validUrl.isUri(this.col2CtaLink)) {
      this.col2CtaIsExternalUrl = true;
    }
  }

}
