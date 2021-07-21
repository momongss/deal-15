import Component from '@/components/component';

import ImgButton from '@/components/img-button/img-button.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.ImgButton1 = new ImgButton({
      buttonType: 'add',
      imageCount: 2,

      onClickAdd: () => {
        console.log('add');
      },
    });

    this.ImgButton2 = new ImgButton({
      buttonType: 'image',
      imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      onClickAdd: () => {
        console.log('image');
      },
      onClickRemove: () => {
        console.log('remove');
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ImgButton1"></div>
      <div class="ImgButton2"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ImgButton1'), this.ImgButton1.$dom);
    this.replaceElement(this.$dom.querySelector('.ImgButton2'), this.ImgButton2.$dom);
  };

  addEvent = () => {
    //
  };
}
