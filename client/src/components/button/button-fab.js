import Component from '@/components/Component';

import styles from '@/styles/components/button/button-fab.module.scss';

// props : { buttonState }
export default class ButtonFab extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('button', {
      className: styles['fab'],
    });

    if (this._props.buttonState != null && this._props.buttonState !== '') {
      this.$dom.classList.add(styles[this._props.buttonState]);
    }

    this.render();
    this.addEvent();

    this._props.onClick();
  }

  render = () => {
    this.$dom.innerHTML = `
      <i class="wmi-add"></i>
    `;
  };

  addEvent = () => {
    this.$dom.addEventListener('click', this._props.onClick);
  };
}
