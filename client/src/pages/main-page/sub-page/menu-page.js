import Component from '@/components/component';
import HeaderMenu from '@/components/header/header-menu';
import TabBar from '@/components/tab-bar/tab-bar';
import ProductListItem from '@/components/product-list-item/product-list-item';
import ChatListItem from '@/components/chat-list-item/chat-list-item';

import classNames from 'classnames';
import styles from '@/styles/pages/main-page/sub-page/menu-page.module.scss';
import common from '@/styles/common.module.scss';

import { api } from '@/utils/api';

const TAB0 = 0;
const TAB1 = 1;
const TAB2 = 2;

export default class MenuPage extends Component {
  moveProductDatailPage = (productId) => {
    console.log(productId);
  };

  constructor(props) {
    super(props);

    this.HeaderMenu = new HeaderMenu({
      title: '메뉴',
      menuType: 'default',
      menuColor: 'grey',
      onClickBack: this.togglePage,
    });
    this.HeaderMenu.$dom.classList.add(styles['top-header']);

    this.currentTab = TAB0;

    this.TabBar = new TabBar({
      tabList: [
        { id: 0, title: '판매목록', initState: 'selected' },
        { id: 1, title: '채팅', initState: '' },
        { id: 2, title: '관심목록', initState: '' },
      ],
      onClick: this.onClickTab,
    });
    this.TabBar.$dom.classList.add(styles['tab-bar']);

    this.$dom = this.createDom('div', {
      className: classNames(styles['menu-page-wrapper'], common['sub-page']),
    });

    this.render();
  }

  onClickTab = (tab) => {
    this.currentTab = tab;
    this.render();
  };

  render = () => {
    this.$dom.innerHTML = `
      <div class="Header"></div>
      <nav class="TabBar"></nav>
      <main class="${styles['menu-main']}"></main>
    `;

    this.replaceElement(this.$dom.querySelector('.Header'), this.HeaderMenu.$dom);
    this.replaceElement(this.$dom.querySelector('.TabBar'), this.TabBar.$dom);

    const $itemList = this.$dom.querySelector(`.${styles['menu-main']}`);

    if (this.currentTab === TAB0) {
      for (const item of api.getSaleItemList()) {
        const productListItem = new ProductListItem({
          productData: item,
          sale: true,
          onClick: (productId) => {
            this.moveProductDatailPage(productId);
          },
        });

        $itemList.appendChild(productListItem.$dom);
      }
    } else if (this.currentTab === TAB1) {
      for (const chat of api.getChatList()) {
        const chatListItem = new ChatListItem({
          id: chat.id,
          name: chat.name,
          lastMessage: chat.lastMessage,
          lastDatetime: chat.lastDatetime,
          messageCount: chat.messageCount,
          image: chat.image,
          onClick: (chatId) => {
            console.log(chatId);
          },
        });

        $itemList.appendChild(chatListItem.$dom);
      }
    } else if (this.currentTab === TAB2) {
      for (const item of api.getWatchItemList()) {
        const productListItem = new ProductListItem({
          productData: item,
          sale: false,
          onClick: (productId) => {
            this.moveProductDatailPage(productId);
          },
        });

        $itemList.appendChild(productListItem.$dom);
      }
    } else {
      console.error('존재하지 않는 탭');
    }
  };

  togglePage = () => {
    this.$dom.classList.toggle(styles['show']);
  };

  hidePage = () => {
    this.$dom.classList.remove(styles['show']);
  };

  showPage = () => {
    this.$dom.classList.add(styles['show']);
  };
}