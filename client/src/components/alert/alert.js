import Component from '@/components/component';

import styles from '@/styles/components/alert/alert.module.scss';

// props : { message, [ okMessage, onClickOk, onClickCancel ] }
export default class Alert extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['alert'],
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    if (this._props.onClickCancel) {
      this.$dom.innerHTML += `
        <div class="${styles['alert-message']}">${this._props.message}</div>
        <div class="${styles['alert-buttons']}">
          <div class="${styles['cancel-button']}">취소</div>
          <div class="${styles['confirm-button']}">${this._props.okMessage}</div>
        </div>
      `;
    } else {
      this.$dom.innerHTML += `
        <div class="${styles['alert-message']}">${this._props.message}</div>
        <div class="${styles['alert-buttons']}">
          <div class="${styles['cancel-button']}"></div>
          <div class="${styles['confirm-button']}">${this._props.okMessage}</div>
        </div>
      `;
    }
  };

  addEvent = () => {
    this.$dom.querySelector(`.${styles['confirm-button']}`).addEventListener('click', this._props.onClickOk);
    if (this._props.onClickCancel) {
      this.$dom.querySelector(`.${styles['cancel-button']}`).addEventListener('click', this._props.onClickCancel);
    }
  };
}
