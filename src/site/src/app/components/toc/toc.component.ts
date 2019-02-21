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
  @Input() pageContent: any;

  constructor() { }

  ngOnInit() {
    console.log(this.pageContent);
  }

  toggleToc() {
    this.showToc = !this.showToc;
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
    const sectionTitles = content.filter(c => c.value.match(regex));
    sectionTitles.map(title => {
      titles.push(title.value);
    });
    titles.map(title => this.createTocItems(title));
  }
}
