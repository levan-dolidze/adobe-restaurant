import { animate, style, transition, trigger } from "@angular/animations";

export const fade = [
  trigger('fade', [
    transition('void=>*', [
      style({ opacity: 0 }),
      animate(500)

    ]),


  ]),

]

export const show = [
  trigger('show', [
    transition(':enter', [
      style({ transform:'translateY(-5%)'}),
      animate('0.5s')
    ]),
  ]),

]