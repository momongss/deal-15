import Component from '@/components/Component';

import styles from '@/styles/components/button/button-tab.module.scss';

// props : { buttonState, buttonText }
export default class ButtonTab extends Component {
  constructor(props) {
    super(props);

    this._state = {
      buttonState: this._props.buttonState,
    };

    this.$dom = this.createDom('button', {
      className: styles[`tab-btn`],
    });

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    if (nextState.buttonState != null) this._state.buttonState = nextState.buttonState;

    this.render();
  };

  render = () => {
    if (this._state.buttonState === 'selected') {
      this.$dom.classList.add(styles['selected']);
    } else {
      this.$dom.classList.remove(styles['selected']);
    }

    this.$dom.innerHTML = `
      <span class=${styles['btn-text']}>${this._props.buttonText}</span>
    `;
  };

  addEvent = () => {
    this.$dom.addEventListener('click', (e) => {
      this._props.onClick();
      // test 코드입니다.
      if (this._state.buttonState === 'selected') {
        this.setState({ buttonState: '' });
      } else {
        this.setState({ buttonState: 'selected' });
      }
    });
  };
}
