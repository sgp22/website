import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

  public closeAccordionsMobile(sidebarNav) {
    let panels = sidebarNav.map(i => true);
    return panels;
  }

  public checkViewport(vpw) {
    let vp = window.matchMedia(vpw);
    if(!vp.matches) {
      return true;
    }
  }

  public toggleAccordion(i, panels) {
    panels[i] = !panels[i];
  }

}
