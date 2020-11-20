import {KEY_NAVIGATION} from '../../../utils';

const DATA_MENU_LIBRARY = [
  [
    {
      id: 1,
      type: 'icon',
      screen: KEY_NAVIGATION.library_push_local,
      img:
        'https://play-lh.googleusercontent.com/GeNnotQ_alnRZJC8Vg6bZaOIaA512D2nos3Fj-kJjWiwg8wNb0Xf-dji354wIDWwMETG',
      icon: 'world',
      name: 'Push Scheduled',
      link: 'https://www.youtube.com/?gl=VN',
    },
    {
      id: 2,
      type: 'none',
      screen: KEY_NAVIGATION.webview,
      img: 'https://image.flaticon.com/icons/png/512/337/337946.png',

      name: 'PDF',
      link:
        'https://s3-ap-northeast-1.amazonaws.com/komeda/pdf/08fe3486-0e81-49f9-92de-6215ad6593c5sample3.pdf',
    },
    {
      id: 3,
      type: 'none',
      screen: KEY_NAVIGATION.location,
      img: 'https://media1.giphy.com/media/SWWLF8WluVJ5vJjMln/giphy.gif',

      name: 'Location',
      link: '',
    },
  ],
];

export default DATA_MENU_LIBRARY;
