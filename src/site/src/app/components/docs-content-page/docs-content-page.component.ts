import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }from '@angular/router';
import { DocsService } from './docs.service';

@Component({
  selector: 'app-docs-content-page',
  templateUrl: './docs-content-page.component.html',
  styleUrls: ['./docs-content-page.component.css']
})
export class DocsContentPageComponent implements OnInit {
  params;
  docs;

  constructor(
    private docsService: DocsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
      console.log(params);
      this.params = `${params.library}/${params.version}/docs/${params.component}.json`;
      console.log(this.params);
      this.docsService.loadDocs(this.params)
        .subscribe(res => {
          this.docs = res['body'];
        })
    })
  }

}
