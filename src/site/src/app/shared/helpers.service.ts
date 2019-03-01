import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
    private router: Router
  ) {}

  public closeAccordionsMobile(sidebarNav) {
    const panels = sidebarNav.map(i => true);
    return panels;
  }

  public checkViewport(vpw) {
    const vp = window.matchMedia(vpw);
    if (!vp.matches) {
      return true;
    }
  }

  public toggleAccordion(i, panels) {
    panels[i] = !panels[i];
  }

  public createTocItems(item: string, tocItems: any) {
    const regexId = new RegExp(/id=(?:'|")(.*?)(?:'|")/g);
    const regexLabel = new RegExp(/(<\/?h2 id=(.[^(?:'|")]+(?:'|")>((.|\n)*?<\/h2>)))/, 'ig');
    const ids = item.match(regexId);
    const id = ids.map(id => id.replace(/id=(?:'|")/g, '').replace(/(?:'|")$/, ''));
    const labels = item.match(regexLabel);
    const label = labels.map(label => label.replace(/(<\/?h2 id=(.[^(?:'|")]+(?:'|")>))/, '').replace(/<\/h2>/, ''));
    for (let i = 0; i < id.length; i++) {
      tocItems.push({
        label: label[i],
        id: id[i]
      })
    }
  }

  public pageLoadToSection() {
    const tree = this.router.parseUrl(this.router.url);
    if (tree.fragment) {
      this.scrollToSection(tree.fragment);
    }
  }

  public scrollToSection(fragment) {
    const section = document.querySelector('#' + fragment);
    if (section) {
      section.scrollIntoView(true);
      const scrolledY = window.scrollY;
      if (scrolledY) {
        window.scroll(0, scrolledY - 90);
      }
    }
  }
}
