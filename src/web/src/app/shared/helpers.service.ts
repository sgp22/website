import { Injectable } from '@angular/core';

@Injectable()
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
}
