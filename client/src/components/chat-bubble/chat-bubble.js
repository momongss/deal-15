import Component from '@/components/component';

import styles from '@/styles/components/chat-bubble/chat-bubble.module.scss';

function stringPreprocess(str) {
  return str.trim().replace(/ /g, '&nbsp;').replace(/\r?\n/gm, '<br />');
}

// props : { type, text }
export default class ChatBubble extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['chat-bubble'],
    });

    this.$dom.classList.add(styles[this._props.type]);

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="${styles['chat-text-wrapper']}">
        <div class="${styles['chat-text']}">${stringPreprocess(this._props.text)}</div>
      </div>
    `;
  };

  addEvent = () => {};
}
