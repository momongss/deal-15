import Component from '@/components/Component';

import styles from '@/styles/components/button/button-normal.module.scss';

// props : { buttonType, buttonState, buttonText }
export default class ButtonNormal extends Component {
  constructor(props) {
    super(props);

    this._state = {
      buttonState: props.buttonState,
    };

    this.$dom = this.createDom('button', {
      className: styles[`button-normal`],
    });

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    if (nextState.buttonState !== null) this._state.buttonState = nextState.buttonState;

    this.render();
  };

  render = () => {
    if (this._props.buttonType != null && this._props.buttonType !== '') {
      this.$dom.classList.add(styles[this._props.buttonType]);
    }

    if (this._state.buttonState === 'disable') {
      this.$dom.classList.add(styles['disable']);
    } else {
      this.$dom.classList.remove(styles['disable']);
    }

    this.$dom.innerHTML = `
      <span class=${styles['btn-text']}>${this._props.buttonText}</span>      
    `;
  };

  addEvent = () => {
    this.$dom.addEventListener('click', () => {
      if (this._state.buttonState !== 'disable') {
        this._props.onClick();
      }
    });
  };
}
