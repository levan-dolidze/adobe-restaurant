import { animate, style, transition, trigger } from "@angular/animations";

export const fade =[
    trigger('fade', [
        transition('void=>*', [
          style({ backgroundColor: 'white', opacity: 0 }),
          animate(500, style({ backgroundColor: '#rgb(171, 155, 86)', opacity: 1 }))
  
        ])
      ]),
      trigger('fadeout', [
        transition('void=>*', [
          style({ color: 'white', opacity: 0 }),
          animate(500, style({ color: 'black', opacity: 1 }))
        ])
  
      ])
]