import Component from '@/components/component';

import ChatBubble from '@/components/chat-bubble/chat-bubble.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.ChatBubble1 = new ChatBubble({
      type: 'other',
      text: '상대방의 말',
    });

    this.ChatBubble2 = new ChatBubble({
      type: 'me',
      text: `내가 한 말ㄴㅇㅇㅇ
      
      ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ            ㅇㄴㅇㅇ             ㅇㄴㅇㄴ`,
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ChatBubble1"></div>
      <div class="ChatBubble2"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ChatBubble1'), this.ChatBubble1.$dom);
    this.replaceElement(this.$dom.querySelector('.ChatBubble2'), this.ChatBubble2.$dom);
  };

  addEvent = () => {
    //
  };
}
