import Component from '@/components/component';

import Alert from '@/components/alert/alert.js';

import classNames from 'classnames';
import styles from '@/styles/screens/alert-screen.module.scss';
import common from '@/styles/common.module.scss';

class AlertScreen extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: classNames(styles['alert-screen'], common['sub-page']),
    });
  }

  clear() {
    this.$dom.classList.remove(styles.show);
    this.$dom.removeChild(this.$alertDom);
  }

  alert = ({ message, okMessage, onClickOk = () => {}, onClickCancel = null }) => {
    if (!message) {
      throw new Error('메세지가 없습니다.');
    }

    const alert = new Alert({
      message,
      okMessage: okMessage || '확인',
      onClickOk: () => {
        this.clear();
        onClickOk();
      },
      onClickCancel:
        onClickCancel &&
        (() => {
          this.clear();
          onClickCancel();
        }),
    });

    this.$alertDom = alert.$dom;

    this.$dom.appendChild(this.$alertDom);
    this.$dom.classList.add(styles.show);
  };
}

const alertScreen = new AlertScreen();
document.querySelector('#app').appendChild(alertScreen.$dom);

export const showAlert = alertScreen.alert;
