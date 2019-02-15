import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface TocItems {
  label: string;
  id: string;
}

@Component({
  selector: 'toc-items',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class TocComponent implements OnInit {
  public landingPage;
  public showToc = false;
  @Input() currentSection: string;
  @Input() component: string;
  @Input() tocItems: any;

  constructor() { }

  ngOnInit() {}

  toggleToc() {
    this.showToc = !this.showToc;
  }
}
