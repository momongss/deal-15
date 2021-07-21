import Component from '@/components/component';

import HeaderMenu from '@/components/header/header-menu.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: 'test-page-wrapper',
      style: 'background-color: pink;',
    });

    this.HeaderMenu1 = new HeaderMenu({
      title: '로그인',
      menuType: 'default',
      menuColor: 'grey',
      onClickBack: () => {
        console.log('back');
      },
    });

    this.HeaderMenu2 = new HeaderMenu({
      title: '채팅하기',
      menuType: 'chat-list',
      menuColor: 'white',
      onClickBack: () => {
        console.log('back');
      },
    });

    this.HeaderMenu3 = new HeaderMenu({
      title: 'UserName',
      menuType: 'chat-detail',
      menuColor: 'white',
      onClickBack: () => {
        console.log('back');
      },
      onClickExit: () => {
        console.log('exit');
      },
    });

    this.HeaderMenu4 = new HeaderMenu({
      title: '글쓰기',
      menuType: 'writing',
      menuColor: 'white',

      onClickBack: () => {
        console.log('back');
      },
      onClickSubmit: () => {
        console.log('submit');
      },
    });

    this.HeaderMenu5 = new HeaderMenu({
      title: '글쓰기',
      menuType: 'writing',
      menuColor: 'white',
      menuState: 'checked',

      onClickBack: () => {
        console.log('back');
      },
      onClickSubmit: () => {
        console.log('submit');
      },
    });

    this.HeaderMenu6 = new HeaderMenu({
      title: '',
      menuType: 'product-detail',
      menuState: 'buy',
      menuColor: 'none',
      onClickBack: () => {
        console.log('back');
      },
      onClickOption: () => {
        console.log('option');
      },
    });

    this.HeaderMenu7 = new HeaderMenu({
      title: '',
      menuType: 'product-detail',
      menuState: 'sell',
      menuColor: 'none',
      onClickBack: () => {
        console.log('back');
      },
      onClickOption: () => {
        console.log('option');
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="HeaderMenu1"></div>
      <div class="HeaderMenu2"></div>
      <div class="HeaderMenu3"></div>
      <div class="HeaderMenu4"></div>
      <div class="HeaderMenu5"></div>
      <div class="HeaderMenu6"></div>
      <div class="HeaderMenu7"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.HeaderMenu1'), this.HeaderMenu1.$dom);
    this.replaceElement(this.$dom.querySelector('.HeaderMenu2'), this.HeaderMenu2.$dom);
    this.replaceElement(this.$dom.querySelector('.HeaderMenu3'), this.HeaderMenu3.$dom);
    this.replaceElement(this.$dom.querySelector('.HeaderMenu4'), this.HeaderMenu4.$dom);
    this.replaceElement(this.$dom.querySelector('.HeaderMenu5'), this.HeaderMenu5.$dom);
    this.replaceElement(this.$dom.querySelector('.HeaderMenu6'), this.HeaderMenu6.$dom);
    this.replaceElement(this.$dom.querySelector('.HeaderMenu7'), this.HeaderMenu7.$dom);
  };

  addEvent = () => {
    //
  };
}
