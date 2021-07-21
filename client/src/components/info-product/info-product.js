import Component from '@/components/component';
import ImgBox from '@/components/img-box/img-box';

import styles from '@/styles/components/info-product/info-product.module.scss';

// props : { type, onInput }
export default class InfoProduct extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['info-product'],
    });

    this.ImgBox = new ImgBox({
      type: 'small',
      imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="${styles['img-area']}">
        <div class="ImgBox"></div>
      </div>
      <div class="${styles['text-area']}">
        <div class="${styles.title}">${this._props.title}</div>
        <div class="${styles.price}">${this._props.price.toLocaleString()}원</div>
      </div>
      <div class="${styles['product-state']}">
        <span>${this._props.productState}</span>
      </div>
    `;

    this.replaceElement(this.$dom.querySelector('.ImgBox'), this.ImgBox.$dom);
  };

  addEvent = () => {};
}
