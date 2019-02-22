import { Component, OnInit, Input } from '@angular/core';
import { slideInRight } from '../../animations';

interface TocItems {
  label: string;
  id: string;
}

@Component({
  selector: 'toc-items',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss'],
  animations: [slideInRight]
})
export class TocComponent implements OnInit {
  public landingPage;
  public showToc = false;
  @Input() currentSection: string;
  @Input() component: string;
  @Input() tocItems: any;

  constructor() { }

  ngOnInit() {
  }

  toggleToc() {
    this.showToc = !this.showToc;
  }
}
