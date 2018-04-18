import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

  public closeAccordionsMobile(sidebarNav, panels) {
    const checkViewport = (vp) => {
      if (!vp.matches) {
        setTimeout(() => {
          panels = sidebarNav.map(i => true);
        });
      };
    };

    let viewport = window.matchMedia('(min-width: 600px)');
    checkViewport(viewport);
  }

}
