import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'theme-switcher',
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent implements OnInit {
  public stylesheetDark: any;
  public stylesheetContrast: any;

  @Output() themeVariant = new EventEmitter;

  constructor() { }

  ngOnInit() {
    this.stylesheetDark = document.createElement('link');
    this.stylesheetDark.rel = 'stylesheet';
    this.stylesheetDark.href = 'theme-dark.css';

    this.stylesheetContrast = document.createElement('link');
    this.stylesheetContrast.rel = 'stylesheet';
    this.stylesheetContrast.href = 'theme-contrast.css';
  }

  themeVariantDefault() {
    if (document.head.contains(this.stylesheetContrast)) {
      document.head.removeChild(this.stylesheetContrast);
    }

    if (document.head.contains(this.stylesheetDark)) {
      document.head.removeChild(this.stylesheetDark);
    }

    this.setThemeVariant('light');
  }

  themeVariantDark() {
    if (document.head.contains(this.stylesheetContrast)) {
      document.head.removeChild(this.stylesheetContrast);
    }
    document.head.appendChild(this.stylesheetDark);
    this.setThemeVariant('dark');
  }

  themeVariantContrast() {
    if (document.head.contains(this.stylesheetDark)) {
      document.head.removeChild(this.stylesheetDark);
    }
    document.head.appendChild(this.stylesheetContrast);
    this.setThemeVariant('contrast');
  }

  setThemeVariant(variant: String) {
    this.themeVariant.emit(variant);
  }
}
