import Component from '@/components/component';

import ImgNav from '@/components/img-nav/img-nav.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.ImgNav1 = new ImgNav({
      navCount: 10,
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ImgNav1"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ImgNav1'), this.ImgNav1.$dom);
  };

  addEvent = () => {
    //
  };
}
