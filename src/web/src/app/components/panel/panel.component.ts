import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {
  @Input() pages;
  @Input() expandedLevel1;
  @Input() section;
  @Input() sidebarPath;

  constructor() {}

  ngOnInit() {}

}
