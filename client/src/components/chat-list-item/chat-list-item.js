import Component from '@/components/component';
import ImgBox from '@/components/img-box/img-box';

import styles from '@/styles/components/chat-list-item/chat-list-item.module.scss';

import { getTimeStamp } from '@/utils/getTimeStamp';

// props : { type, text }
export default class ChatListItem extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['chat-list-item'],
    });

    this.ImgBox = new ImgBox({
      type: 'small',
      imageURL: this._props.image,
      onClick: () => {
        console.log('img-small');
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="${styles['area-1']}">
        <div class="${styles['name']}">${this._props.name}</div>
        <div class="${styles['message']}">${this._props.lastMessage}</div>
      </div>
      <div class="${styles['area-2']}">
        <div class="${styles['time-stamp']}">${getTimeStamp(this._props.lastDatetime)}</div>
        ${
          this._props.messageCount > 0
            ? `
        <div class="${styles['message-count']}">
          <span>${this._props.messageCount}</span>
        </div>`
            : ''
        }
      </div>
      <div class="${styles['area-3']}">
        <div class="ImgBox"></div>
      </div>
    `;

    this.replaceElement(this.$dom.querySelector('.ImgBox'), this.ImgBox.$dom);
  };

  addEvent = () => {
    this.$dom.addEventListener('click', () => {
      this._props.onClick(this._props.id);
    });
  };
}
