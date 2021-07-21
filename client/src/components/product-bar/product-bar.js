import Component from '@/components/component';

import styles from '@/styles/components/product-bar/product-bar.module.scss';

export default class ProductBar extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['product-bar'],
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <button class="${styles['like-button']}">
        <i class="wmi-heart"></i>
      </button>
      <div class="${styles['price']}">${this._props.price.toLocaleString()}원</div>
      <button class="${styles['main-button']}">${this._props.buttonName}</button>
    `;
  };

  addEvent = () => {};
}
