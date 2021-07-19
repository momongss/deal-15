import Component from '@/components/Component';

import styles from '@/styles/components/button/button-status.module.scss';

// props : { buttonText }
export default class ButtonStatus extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('button', {
      className: styles[`status-btn`],
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <span class=${styles['status-text']}>${this._props.buttonText}</span>
      <i class="wmi-chevron-down"></i>
    `;
  };

  addEvent = () => {
    this.$dom.addEventListener('click', (e) => {
      this._props.onClick();
    });
  };
}
