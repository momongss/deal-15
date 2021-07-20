import Component from '@/components/component';

export default class TestComponent extends Component {
  constructor(props) {
    super(props);

    this._state = { test: 0 };

    this.$dom = this.createDom('div', 'test-component-wrapper');
    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <span class="test-component">테스트 컴포넌트 ${this._props.number}</span>
      <span class="state-test">${this._state.test}</span>
    `;
  };

  addEvent = () => {
    this.$dom.addEventListener('click', (e) => {
      if (e.target.className === 'test-component') {
        console.log(this._props.number);
      } else if (e.target.className === 'state-test') {
        this.setState({ test: this._state.test + 1 });
      }
    });
  };
}
