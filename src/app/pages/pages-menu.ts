import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true
  },
  {
    title: 'Log book',
    icon: 'ion-clipboard',
    link: '/pages/log-form',
    home: true
  },
  {
    title: 'Beam position uploader',
    icon: 'ion-camera',
    link: '/pages/image-uploader'
  }
];
