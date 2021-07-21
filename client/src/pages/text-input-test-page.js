import Component from '@/components/component';

import TextInput from '@/components/text-input/text-input.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.TextInput1 = new TextInput({
      type: 'medium',
      text: '메세지를 입력하세요.',
      onInput: (e) => {
        console.log(e.target.value);
      },
    });

    this.TextInput2 = new TextInput({
      type: 'large',
      text: '아이디를 입력하세요.',
      onInput: (e) => {
        console.log(e.target.value);
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="TextInput1"></div>
      <div class="TextInput2"></div>

    `;

    this.replaceElement(this.$dom.querySelector('.TextInput1'), this.TextInput1.$dom);
    this.replaceElement(this.$dom.querySelector('.TextInput2'), this.TextInput2.$dom);
  };

  addEvent = () => {
    //
  };
}
