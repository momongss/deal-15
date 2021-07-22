import Component from '@/components/component';

import ChatListItem from '@/components/chat-list-item/chat-list-item.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.ChatListItem = new ChatListItem({
      id: '0',
      name: '닉네임',
      lastMessage: '남은 물건 있나요?',
      lastDatetime: '2021-07-21T10:37:03.666Z',
      messageCount: 9,
      image: '',
      onClick: (chatId) => {
        console.log(chatId);
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ChatListItem"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ChatListItem'), this.ChatListItem.$dom);
  };

  addEvent = () => {
    //
  };
}
