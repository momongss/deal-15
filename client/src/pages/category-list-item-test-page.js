import Component from '@/components/component';

import ImgBox from '@/components/category-list-item/category-list-item.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.ImgBox1 = new ImgBox({
      title: 'CategoryTitle1',
      imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      onClick: () => {
        console.log('category1');
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ImgBox1"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ImgBox1'), this.ImgBox1.$dom);
  };

  addEvent = () => {
    //
  };
}
