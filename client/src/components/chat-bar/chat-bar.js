import Component from '@/components/component';
import TextInput from '@/components/text-input/text-input';

import styles from '@/styles/components/chat-bar/chat-bar.module.scss';
import { _ } from 'core-js';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);

    this._state = {
      filled: false,
      message: '',
    };

    this.$dom = this.createDom('div', {
      className: styles['chat-bar'],
    });

    this.TextInput = new TextInput({
      type: 'medium',
      text: '메세지를 입력하세요.',
      onInput: this.onInput,
    });

    this.render();
    this.addEvent();
  }

  onInput = (e) => {
    const $sendButton = this.$dom.querySelector(`.${styles['send-button']}`);
    if (e.target.value.length > 0) {
      $sendButton.classList.add(styles['filled']);
      this._state.filled = true;
    } else {
      $sendButton.classList.remove(styles['filled']);
      this._state.filled = false;
    }

    this._state.message = e.target.value;
  };

  render = () => {
    this.$dom.innerHTML = `
      <div class="TextInput"></div>
      <button class="${styles['send-button']}">
        <i class="wmi-send"></i>
      </button>
    `;

    this.replaceElement(this.$dom.querySelector('.TextInput'), this.TextInput.$dom);
  };

  addEvent = () => {
    const $sendButton = this.$dom.querySelector(`.${styles['send-button']}`);
    $sendButton.addEventListener('click', () => {
      if (this._state.filled) {
        this._props.onSend(this._state.message);
      }
    });
  };
}
