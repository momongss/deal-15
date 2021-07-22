import 'core-js';

import '@/styles/reset.css';
import '@/styles/global.scss';
import '@/assets/fonts/woowa-market-icons.css';

import store from '@/utils/store';

function needLogin() {
  if (!store.state.login) {
    location.href = '/login';
    return true;
  }
  return false;
}

function needNotLogin() {
  if (store.state.login) {
    location.href = '/';
    return true;
  }
  return false;
}

import MainPage from '@/pages/main-page/main-page';
import Loginpage from '@/pages/login-page';
import ProductPage from '@/pages/product-page/product-detail-page';
import WritePage from '@/pages/write-page/write-page';
import NotFoundPage from '@/pages/404-page';
import SetLocationPage from './pages/main-page/sub-page/set-location-page';

const $app = document.querySelector('#app');

const { pathname } = location;
switch (true) {
  case pathname === '/':
    if (needLogin()) break;
    new MainPage({ $app });
    break;
  case pathname === '/login':
    if (needNotLogin()) break;
    new Loginpage({ $app });
    break;
  case !!pathname.match(/^\/products\/\d+$/):
    if (needLogin()) break;
    new ProductPage({ $app });
    break;
  case !!pathname.match(/^\/write/):
    if (needLogin()) break;
    new WritePage({ $app });
    break;
  case !!pathname.match(/^\/location/):
    if (needLogin()) break;
    new SetLocationPage({ $app });
    break;
  default:
    new NotFoundPage({ $app });
}
