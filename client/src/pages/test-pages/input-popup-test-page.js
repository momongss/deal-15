import Component from '@/components/component';

import InputPopup from '@/components/input-popup/input-popup';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.InputPopup = new InputPopup({
      onSubmit: (value) => {
        console.log(value);
      },
      onCancel: () => {
        console.log('cancel');
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="InputPopup"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.InputPopup'), this.InputPopup.$dom);
  };

  addEvent = () => {
    //
  };
}
