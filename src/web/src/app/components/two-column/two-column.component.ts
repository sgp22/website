import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'two-column',
  templateUrl: './two-column.component.html',
})
export class TwoColumnComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}
}