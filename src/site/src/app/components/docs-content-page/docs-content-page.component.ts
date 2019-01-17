import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }from '@angular/router';
import { DocsService } from './docs.service';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, style, animate, query, group } from "@angular/animations";

@Component({
  selector: 'app-docs-content-page',
  templateUrl: './docs-content-page.component.html',
  styleUrls: ['./docs-content-page.component.css']
})
export class DocsContentPageComponent implements OnInit {
  public params;
  public docs;
  public absolutePath = '';
  public library = '';
  public component = '';
  public loading;

  constructor(
    private docsService: DocsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {

      this.absolutePath = `code/${params.library}/${params.version}`;
      this.library = `${params.library}`;

      if (params.component) {
        this.params = `${params.library}/${params.version}/docs/${params.component}.json`;
        this.component = `${params.component}`;
      } else {
        this.params = `${params.library}/${params.version}/docs/index.json`;
      }

      this.docsService.loadDocs(this.params)
        .subscribe(res => {

          this.docs = res;

          if (res['demo']) {
            if (res['demo'].pages) {
              res['demo'].pages.forEach(page => {
                page.githubUrl = this.createGithubUrl(page.slug);
                page.url = this.createDemoUrl(page.slug);
              });
            }

            if (res['demo'].embedded) {
              res['demo'].embedded.forEach(page => {
                page.githubUrl = this.createGithubUrl(page.slug);
                page.url = this.createDemoUrl(page.slug);
                page.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.createDemoUrl(page.slug, true));
              });
            }
          }

          this.loading = false;
        })
    })
  }

  createDemoUrl(slug: string, embeddedLayout: boolean = false) {
    let url = `${this.absolutePath}/demo/components/${this.component}/${slug}?font=source-sans`;
    if (embeddedLayout) {
      url += '&layout=embedded';
    }
    return url;
  }

  createGithubUrl(slug: string) {
    const repoName = this.library.replace('ids-', '');
    let url = `https://github.com/infor-design/${repoName}/blob/`;
    url += `latest/app/views/components/${this.component}/${slug}.html`;
    return url;
  }

}
