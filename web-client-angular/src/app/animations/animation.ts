import { trigger, sequence, state, stagger, animate, transition, style, query, animateChild } from '@angular/animations';


export const fadeOut =
  trigger('fadeOut', [
    state('void', style({ opacity: 0, transform: 'translateY(-5rem)', 'box-shadow': 'none' })),
    transition('void => *', sequence([
      animate("0.7s ease")
    ])),
    transition('* => void', [animate("0.7s ease")])
  ]);

export const rowsAnimation =
  trigger('rowsAnimation', [
    state('void', style({ opacity: 0, transform: 'translateX(-55rem)', 'box-shadow': 'none' })),
    transition('void => *', sequence([
      animate("0.7s ease")
    ])),
    //transition('* => void', [animate("0.7s ease")])
  ]);


export const fade =
  trigger('fade', [
    state('void', style({
      opacity: 0
    })), 
    transition(':enter', [
      style({ opacity: '0' }),
      animate('0.2s 200ms ease-in', style({ opacity: '1' }))
    ]),
    transition(':leave', [
      style({ opacity: '1' }),
      animate('0.3s ease-out', style({ opacity: '0' }))
    ])
  ])



export const blub =
  trigger('blub', [
    transition(':leave', [
      style({ background: 'pink' }),
      query('*', stagger(-150, [animateChild()]), { optional: true })
    ]),
  ]);

