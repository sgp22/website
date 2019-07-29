import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'theme-switcher',
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent implements OnInit {
  public stylesheetDark: any;
  public stylesheetContrast: any;

  @Output() theme = new EventEmitter;

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

    this.setTheme('default');
  }

  themeDark() {
    if (document.head.contains(this.stylesheetContrast)) {
      document.head.removeChild(this.stylesheetContrast);
    }
    document.head.appendChild(this.stylesheetDark);
    this.setTheme('dark');
  }

  themeContrast() {
    if (document.head.contains(this.stylesheetDark)) {
      document.head.removeChild(this.stylesheetDark);
    }
    document.head.appendChild(this.stylesheetContrast);
    this.setTheme('contrast');
  }

  setTheme(theme) {
    this.theme.emit(theme);
  }
}
