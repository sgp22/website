import { Component, OnInit, Input } from '@angular/core';

interface TocItems {
  label: string;
  id: string;
}

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.css']
})
export class TocComponent implements OnInit {
  public landingPage;
  @Input() component: string;
  @Input() tocItems: any;

  constructor() { }

  ngOnInit() {}
}
