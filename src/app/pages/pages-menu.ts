import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Beam status',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true
  },
  {
    title: 'Log book',
    icon: 'ion-clipboard',
    link: '/pages/log-form'
  },
  {
    title: 'Beam position uploader',
    icon: 'ion-camera',
    link: '/pages/image-uploader'
  },
  {
    title: 'Parameter setter',
    icon: 'fas fa-tools',
    children: [
      {
        title: 'Flux',
        icon: 'fas fa-tools',
        link: '/pages/setter/flux'
      },
      {
        title: 'Polarity',
        icon: 'fas fa-tools',
        link: '/pages/setter/polarimeter'
      }
    ]
  }
];
