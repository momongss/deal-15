import Component from '@/components/Component';

import TestComponent from '@/components/TestComponent';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.testComponent1 = new TestComponent({ number: 0 });
    this.testComponent2 = new TestComponent({ number: 1 });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="test-component-wrapper1"></div>
      <div class="test-component-wrapper2"></div>
    `;

    this.replaceElement(
      this.$dom.querySelector('.test-component-wrapper1'),
      this.testComponent1.$dom,
    );

    this.replaceElement(
      this.$dom.querySelector('.test-component-wrapper2'),
      this.testComponent2.$dom,
    );
  };

  addEvent = () => {
    //
  };
}
