import Component from '@/components/Component';

import ChatBadge from '@/components/chat-badge/chat-badge.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.ChatBadge = new ChatBadge({
      chatCount: 999,
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ChatBadge"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ChatBadge'), this.ChatBadge.$dom);
  };

  addEvent = () => {
    //
  };
}
