import Component from '@/components/component';

import Alert from '@/components/alert/alert.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.Alert = new Alert({
      alertType: 'confirm',
      alertMessage: '정말로 이 채팅방을 나가시겠습니까?',
      confirmText: '나가기',
      onClickCancel: () => {
        console.log('cancel');
      },
      onClickConfirm: () => {
        console.log('exit');
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="Alert"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.Alert'), this.Alert.$dom);
  };

  addEvent = () => {
    //
  };
}
