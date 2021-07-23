import Component from '@/components/component';

import styles from '@/styles/components/drop-down/drop-down.module.scss';

export default class DropDown extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['drop-down'],
    });

    this._state = {
      itemList: props.itemList,
    };

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = this._state.itemList
      .map((item) => {
        return `<div class="${styles['item']} ${styles[item.state]}">${item.label}</div>`;
      })
      .join('');
  };

  setState = (nextState) => {
    this._state = { ...this._state, ...nextState };
    this.render();
  };

  addEvent = () => {
    this.$dom.addEventListener('click', (e) => {
      if (e.target.classList.contains(styles.item)) {
        this._props.onClick(e, e.target.textContent);
      }
    });
  };
}
