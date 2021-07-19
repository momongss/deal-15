import Component from '@/components/Component';

import styles from '@/styles/components/button/button-location.module.scss';

// props : { buttonType, buttonState, buttonText }
export default class ButtonLocation extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('button', {
      className: styles['location'],
    });

    if (this._props.buttonState != null && this._props.buttonState !== '') {
      this.$dom.classList.add(styles[this._props.buttonState]);
    }

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      ${
        this._props.buttonState !== 'add'
          ? `<span class=${styles['btn-text']}>${this._props.buttonText}</span>`
          : ''
      }
      ${
        this._props.buttonState === 'add'
          ? `<i class="wmi-add ${styles['btn-add']}"></i>`
          : `<i class="wmi-close ${styles['btn-close']}"></i>`
      }
    `;
  };

  addEvent = () => {
    this.$dom.addEventListener('click', (e) => {
      if (this._props.buttonState === 'add') {
        this._props.onClickAdd();
        return;
      }

      if (e.target.classList.contains(styles['btn-close'])) {
        this._props.onClickRemove();
      }
    });
  };
}
