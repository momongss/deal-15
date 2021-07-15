import 'core-js';

import '@/styles/reset.css';
import '@/styles/global.scss';

import TestPage from '@/pages/TestPage.js';

const testPage = new TestPage();
document.querySelector('#app').appendChild(testPage.$dom);
