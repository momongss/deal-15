import Component from '@/components/component';

import InfoProduct from '@/components/info-product/info-product.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.InfoProduct = new InfoProduct({
      title: '빈티지 롤러 스케이트',
      price: 160000,
      productState: '판매중',
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="InfoProduct"></div>
      <div class="ImgButton2"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.InfoProduct'), this.InfoProduct.$dom);
  };

  addEvent = () => {
    //
  };
}
