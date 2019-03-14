import { Directive, Injectable, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollSpy]'
})
export class ScrollSpyDirective {
  @Output() public sectionChange = new EventEmitter<string>();
  private currentSection: string;
  public scrollOffset = 150;

  constructor(private _el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onSectionChange() {
    let currentSection: string;
    const sections = this._el.nativeElement.querySelectorAll('h2');
    const scrollTop = event.target['scrollingElement']['scrollTop'];

    for (let i = 0; i < sections.length; i++) {
      const element = sections[i];
      if (element.offsetTop - this.scrollOffset <= scrollTop) {
        currentSection = element.id;
      }
    }

    if (currentSection !== this.currentSection) {
      this.currentSection = currentSection;
      this.sectionChange.emit(this.currentSection);
    }
  }
}
