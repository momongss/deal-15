import Component from '@/components/component';

import ProductBar from '@/components/product-bar/product-bar.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.ProductBar = new ProductBar({
      price: 169000,
      buttonName: 'Button',
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ProductBar"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ProductBar'), this.ProductBar.$dom);
  };

  addEvent = () => {
    //
  };
}
