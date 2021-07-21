import Component from '@/components/component';

import ImgBox from '@/components/img-box/img-box.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.ImgBox1 = new ImgBox({
      type: 'small',
      imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      onClick: () => {
        console.log('img-small');
      },
    });
    this.ImgBox2 = new ImgBox({
      type: 'medium',
      imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      onClick: () => {
        console.log('img-medium');
      },
    });
    this.ImgBox3 = new ImgBox({
      type: 'large',
      imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      onClick: () => {
        console.log('img-large');
      },
    });
    this.ImgBox4 = new ImgBox({
      type: 'gradient',
      imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      onClick: () => {
        console.log('img-gradient');
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ImgBox1"></div>
      <div class="ImgBox2"></div>
      <div class="ImgBox3"></div>
      <div class="ImgBox4"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ImgBox1'), this.ImgBox1.$dom);
    this.replaceElement(this.$dom.querySelector('.ImgBox2'), this.ImgBox2.$dom);
    this.replaceElement(this.$dom.querySelector('.ImgBox3'), this.ImgBox3.$dom);
    this.replaceElement(this.$dom.querySelector('.ImgBox4'), this.ImgBox4.$dom);
  };

  addEvent = () => {
    //
  };
}
