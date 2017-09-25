import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'test-list-block',
  templateUrl: './test-list-block.component.html',
  styleUrls: ['./test-list-block.component.css']
})
export class TestListBlockComponent implements OnInit {

  @Input() name: string;
  @Input() description: string;  

  constructor() { }

  ngOnInit() {
  }

}
