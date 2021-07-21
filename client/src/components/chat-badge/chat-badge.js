import Component from '@/components/component';

import styles from '@/styles/components/chat-badge/chat-badge.module.scss';

// props : { chatCount }
export default class ChatBadge extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['chat-badge'],
    });

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
      <span class="${styles['chat-count']}">${this._props.chatCount}</span>
    `;
  };
}
