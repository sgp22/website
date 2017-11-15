import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'streamfields',
  templateUrl: './streamfields.component.html'
})
export class StreamfieldsComponent implements OnInit {

  @Input() streamfields: any;

  constructor() { }

  ngOnInit() {
  }

}
