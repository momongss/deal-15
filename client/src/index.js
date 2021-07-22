import 'core-js';

import '@/styles/reset.css';
import '@/styles/global.scss';
import '@/assets/fonts/woowa-market-icons.css';

import MainPage from '@/pages/main-page/main-page';
import ProductPage from '@/pages/product-page/product-detail-page';
import NotFoundPage from '@/pages/404-page';

const $app = document.querySelector('#app');

const { pathname } = location;
switch (true) {
  case pathname === '/':
    new MainPage({ $app });
    break;
  case !!pathname.match(/^\/products\/\d+$/):
    new ProductPage({ $app });
    break;
  default:
    new NotFoundPage({ $app });
}
