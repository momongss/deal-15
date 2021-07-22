import 'core-js';

import '@/styles/reset.css';
import '@/styles/global.scss';
import '@/assets/fonts/woowa-market-icons.css';

import TestPage from '@/pages/main-page/main-page';

const $app = document.querySelector('#app');
const testPage = new TestPage({ $app });

// import TestPage from '@/pages/test-pages/chat-list-item-test-page';

// const testPage = new TestPage();
// document.querySelector('#app').appendChild(testPage.$dom);
