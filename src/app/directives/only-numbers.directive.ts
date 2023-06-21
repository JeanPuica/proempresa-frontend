import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class OnlyNumbersDirective {
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (!isNaN(+e.key) || this.navigationKeys.includes(e.key)) {
      return;
    }
    else {
      e.preventDefault();
    }
  }

  constructor() { }
}
