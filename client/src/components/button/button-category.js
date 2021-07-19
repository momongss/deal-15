import Component from '@/components/Component';

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

    this._props.onClick();
  }

  render = () => {
    if (this._props.buttonState === 'disable') {
      this.$dom.classList.add(styles['disable']);
    } else {
      this.$dom.classList.remove(styles['disable']);
    }

    this.$dom.innerHTML = `
      <span class=${styles['btn-text']}>${this._props.buttonText}</span>
    `;
  };

  addEvent = () => {
    this.$dom.addEventListener('click', this._props.onClick);
  };
}
