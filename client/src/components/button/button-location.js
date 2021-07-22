import Component from '@/components/component';

import styles from '@/styles/components/button/button-location.module.scss';

// props : { buttonType, buttonState, buttonText }
export default class ButtonLocation extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('button', {
      className: styles['location'],
    });

    this._state = {
      buttonState: props.buttonState,
    };

    if (this._props.buttonState != null && this._props.buttonState !== '') {
      this.$dom.classList.add(styles[this._props.buttonState]);
    }

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    if (nextState.buttonState != null) this._state.buttonState = nextState.buttonState;
  };

  render = () => {
    this.$dom.innerHTML = `
      ${this._state.buttonState !== 'add' ? `<span class=${styles['btn-text']}>${this._props.buttonText}</span>` : ''}
      ${
        this._state.buttonState === 'add'
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
        this._props.onClickRemove(this._props.position);
      } else {
        this._props.onClickLocation(this._props.position);
      }
    });
  };
}
