import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'streamfields',
  templateUrl: './streamfields.component.html',
  styleUrls: ['./streamfields.component.css']
})
export class StreamfieldsComponent implements OnInit {

  @Input() streamfields: any

  constructor() { }

  ngOnInit() {
  }

}
