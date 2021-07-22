import Component from '@/components/component';
import HeaderMenu from '@/components/header/header-menu';
import ChatListItem from '@/components/chat-list-item/chat-list-item';

import styles from '@/styles/pages/product-page/sub-page/chat-page.module.scss';

import { api } from '@/utils/api';

export default class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.HeaderMenu = new HeaderMenu({
      title: '채팅하기',
      menuType: 'default',
      menuColor: 'white',
      onClickBack: this.togglePage,
    });

    this.$dom = this.createDom('div', {
      className: `${styles['chat-page-wrapper']}`,
    });

    this._state = {
      ...api.getChatList(props.productId),
    };

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="Header"></div>
      <main class="${styles['chat-main']}">
      </main>
    `;

    this.replaceElement(this.$dom.querySelector('.Header'), this.HeaderMenu.$dom);

    const $itemList = this.$dom.querySelector(`.${styles['chat-main']}`);

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
