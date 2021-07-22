import Component from '@/components/component';

import styles from '@/styles/components/button/button-category.module.scss';

// props : { buttonState }
export default class ButtonCategory extends Component {
  constructor(props) {
    super(props);

    this._state = {
      buttonState: props.buttonState,
    };

    this.$dom = this.createDom('button', {
      className: styles['category-button'],
    });

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    if (nextState.buttonState != null) this._state.buttonState = nextState.buttonState;

    this.render();
  };

  render = () => {
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
      this._props.onClick(this._props.categoryId);
    });
  };
}
