import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
  public stylesheetDark: any;
  public stylesheetContrast: any;

  constructor() { }

  ngOnInit() {
    this.stylesheetDark = document.createElement('link');
    this.stylesheetDark.rel = 'stylesheet';
    this.stylesheetDark.href = 'theme-dark.css';

    this.stylesheetContrast = document.createElement('link');
    this.stylesheetContrast.rel = 'stylesheet';
    this.stylesheetContrast.href = 'theme-contrast.css';
  }

  themeDefault() {
    if (document.head.contains(this.stylesheetContrast)) {
      document.head.removeChild(this.stylesheetContrast);
    }

    if (document.head.contains(this.stylesheetDark)) {
      document.head.removeChild(this.stylesheetDark);
    }
  }

  themeDark() {
    if (document.head.contains(this.stylesheetContrast)) {
      document.head.removeChild(this.stylesheetContrast);
    }
    document.head.appendChild(this.stylesheetDark);
  }

  themeContrast() {
    if (document.head.contains(this.stylesheetDark)) {
      document.head.removeChild(this.stylesheetDark);
    }
    document.head.appendChild(this.stylesheetContrast);
  }
}
