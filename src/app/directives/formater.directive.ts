import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[Formater]'
})

export class FormaterDirective {

  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    let result = this.formatInput(this.el.nativeElement.value)
    this.el.nativeElement.value = result;
  }

  formatInput(input: any) {
    this.el.nativeElement.value = input.toUpperCase()
    return this.el.nativeElement.value
  };

}
