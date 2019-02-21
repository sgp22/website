import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'core-content-page',
  templateUrl: './core-content-page.component.html'
})
export class CoreContentPageComponent implements OnInit {
  public pageContent: any;
  public loading = true;
  public tocItems = [];
  public sectionTitles: any;
  public currentSection: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegment => {
      this.loading = true;
      window.scroll(0, 0);
      this.pagesService.createPage(this.router.url)
        .subscribe(
          res => {
            this.pageContent = res;
            this.buildToc();
          },
          err => {
            console.error(err);
            this.loading = false;
          },
          () => {
            this.loading = false;

            if (!this.loading) {
              setTimeout(() => {
                this.pageLoadToSection();
              }, 200);
            }
          }
        );

      (<any>window).ga('set', {
        'dimension2': (urlSegment[2] ? `${urlSegment[2].path}` : 'n/a'),
        'dimension3': (urlSegment[1] ? `${urlSegment[1].path}` : 'n/a'),
        'dimension4': `${urlSegment[0].path}`
      });
      (<any>window).ga('send', 'pageview');
    });
  }

  createTocItems(item) {
    const regexId = new RegExp(/id=(?:'|")(.*?)(?:'|")/g);
    const regexLabel = new RegExp(/(<\/?h2 id=(.[^(?:'|")]+(?:'|")>((.|\n)*?<\/h2>)))/, 'ig');
    const ids = item.match(regexId);
    const id = ids[0].replace(/id=(?:'|")/g, '').replace(/(?:'|")$/, '');
    const labels = item.match(regexLabel);
    const label = labels[0].replace(/(<\/?h2 id=(.[^(?:'|")]+(?:'|")>))/, '').replace(/<\/h2>/, '');
    this.tocItems.push({
      label: label,
      id: id
    });
  }

  buildToc() {
    this.tocItems = [];
    const titles = [];
    const regex = new RegExp(/(<\/?h2 id=(.[^(?:'|")]+(?:'|")>((.|\n)*?<\/h2>)))/, 'ig');
    const content = this.pageContent.body.filter(c => c.type === 'markdown');
    this.sectionTitles = content.filter(c => c.value.match(regex));
    this.sectionTitles.map(title => {
      titles.push(title.value);
    });
    titles.map(title => this.createTocItems(title));
  }

  pageLoadToSection() {
    const tree = this.router.parseUrl(this.router.url);
    if (tree.fragment) {
      this.scrollToSection(tree.fragment);
    }
  }

  scrollToSection(fragment) {
    const section = document.querySelector('#' + fragment);
    if (section) {
      section.scrollIntoView(true);
      const scrolledY = window.scrollY;
      if (scrolledY) {
        window.scroll(0, scrolledY - 90);
      }
    }
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }
}
