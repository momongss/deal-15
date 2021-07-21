import Component from '@/components/component';

import styles from '@/styles/components/drop-down/drop-down.module.scss';

export default class DropDown extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['drop-down'],
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = this._props.itemList
      .map((item) => {
        return `<div class="${styles['item']} ${styles[item.state]}">${item.label}</div>`;
      })
      .join('');
  };

  addEvent = () => {
    this.$dom.addEventListener('click', (e) => {
      if (e.target.classList.contains(styles.item)) {
        this._props.onClick(e.target.textContent);
      }
    });
  };
}
