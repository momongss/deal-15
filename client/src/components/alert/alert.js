import Component from '@/components/component';

import styles from '@/styles/components/alert/alert.module.scss';

// props : { alertType, alertMessage, [ confirmText, onClickCancel, onClickConfirm ] }
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
    if (this._props.alertType === 'normal') {
      this.$dom.innerHTML = `
        <div class="${styles['alert-message']}">${this._props.alertMessage}</div>
      `;
    } else if (this._props.alertType === 'confirm') {
      this.$dom.innerHTML += `
        <div class="${styles['alert-message']}">${this._props.alertMessage}</div>
        <div class="${styles['alert-buttons']}">
          <div class="${styles['cancel-button']}">취소</div>
          <div class="${styles['confirm-button']}">${this._props.confirmText}</div>
        </div>
      `;
    }
  };

  addEvent = () => {
    if (this._props.alertType === 'confirm') {
      this.$dom
        .querySelector(`.${styles['cancel-button']}`)
        .addEventListener('click', this._props.onClickCancel);
      this.$dom
        .querySelector(`.${styles['confirm-button']}`)
        .addEventListener('click', this._props.onClickConfirm);
    }
  };
}
