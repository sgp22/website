import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

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
    const id = ids[0].replace(/id=(?:'|")/g, '').replace(/(?:'|")$/, '');
    const labels = item.match(regexLabel);
    const label = labels[0].replace(/(<\/?h2 id=(.[^(?:'|")]+(?:'|")>))/, '').replace(/<\/h2>/, '');
    tocItems.push({
      label: label,
      id: id
    });
  }
}
