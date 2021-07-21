import Component from '@/components/component';

import InfoSaler from '@/components/info-saler/info-saler.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.InfoSaler = new InfoSaler({
      name: 'Username',
      place: '장곡동',
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="InfoSaler"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.InfoSaler'), this.InfoSaler.$dom);
  };

  addEvent = () => {
    //
  };
}
