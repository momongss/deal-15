import Component from '@/components/component';

import ChatBar from '@/components/chat-bar/chat-bar.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.ChatBar = new ChatBar({
      onSend: (message) => {
        console.log(message);
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ChatBar"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ChatBar'), this.ChatBar.$dom);
  };

  addEvent = () => {
    //
  };
}
