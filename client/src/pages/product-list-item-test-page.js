import Component from '@/components/component';

import ProductListItem from '@/components/product-list-item/product-list-item.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    const itemList = [
      {
        id: '10',
        image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
        title: 'Title',
        watch: true,
        location: 'Location',
        createdDatetime: '2021-07-21T10:37:03.666Z',
        price: 160000,
        count: {
          chat: 0,
          watch: 1,
        },
      },
    ];

    this.ProductListItem = new ProductListItem({
      productData: itemList[0],
      onClick: (id) => {
        console.log(id);
      },
      onClickLike: () => {},
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ProductListItem"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ProductListItem'), this.ProductListItem.$dom);
  };

  addEvent = () => {
    //
  };
}
