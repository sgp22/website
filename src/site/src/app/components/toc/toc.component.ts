import { Component, OnInit, Input } from '@angular/core';

interface TocItems {
  label: string;
  id: string;
}

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss']
})
export class TocComponent implements OnInit {
  public landingPage;
  public showToc = false;
  @Input() component: string;
  @Input() tocItems: any;

  constructor() { }

  ngOnInit() {}

  toggleToc() {
    this.showToc = !this.showToc;
  }
}
