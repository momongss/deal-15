import Component from '@/components/Component';

import DropDown from '@/components/drop-down/drop-down.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.DropDown = new DropDown({
      itemList: [
        {
          label: 'Label1',
          state: 'normal',
        },
        {
          label: 'Label2',
          state: 'normal',
        },
        {
          label: 'Label3',
          state: 'highlighted',
        },
      ],

      onClick: (label) => {
        console.log(label);
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="DropDown"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.DropDown'), this.DropDown.$dom);
  };

  addEvent = () => {
    //
  };
}
