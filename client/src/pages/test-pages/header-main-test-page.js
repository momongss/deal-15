import Component from '@/components/component';

import HeaderMain from '@/components/header/header-main.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.HeaderMain = new HeaderMain({
      location: '장소',
      onClickCategory: () => {
        console.log('category');
      },
      onClickPlace: () => {
        console.log('place');
      },
      onClickAccount: () => {
        console.log('account');
      },
      onClickMenu: () => {
        console.log('menu');
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="Header1"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.Header1'), this.HeaderMain.$dom);
  };

  addEvent = () => {
    //
  };
}
