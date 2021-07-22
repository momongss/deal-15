import Component from '@/components/component';

import styles from '@/styles/pages/product-page/product-detail-page.module.scss';

import ChatPage from './sub-page/chat-page';

import HeaderMenu from '@/components/header/header-menu';
import ImgBox from '@/components/img-box/img-box';
import ImgNav from '@/components/img-nav/img-nav';
import DropDown from '@/components/drop-down/drop-down';

import ButtonStatus from '@/components/button/button-status';
import InfoSaler from '@/components/info-saler/info-saler';
import ProductBar from '@/components/product-bar/product-bar';

import { api } from '@/utils/api';
import { getTimeStamp } from '@/utils/getTimeStamp';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);

    // test
    this._props.userType = 'sell';
    //

    const productInfoData = api.getProductInfo();

    this._state = { ...productInfoData, imageIndex: 0 };

    this.$dom = this.createDom('div', { className: styles['product-detail-page-wrapper'] });

    this.$dom.classList.add(styles[this._props.userType]);

    this.ChatPage = new ChatPage({ productId: this._state.id });

    props.$app.appendChild(this.$dom);
    props.$app.appendChild(this.ChatPage.$dom);

    this.Header = new HeaderMenu({
      title: '',
      menuType: 'product-detail',
      menuState: this._props.userType,
      menuColor: 'none',
      onClickBack: () => {
        console.log('back');
      },
      onClickOption: this.toggleOption,
    });

    this.DropDown = new DropDown({
      itemList: [
        {
          label: '수정하기',
          state: 'normal',
        },

        {
          label: '삭제하기',
          state: 'highlighted',
        },
      ],

      onClick: (label) => {
        if (label === '수정하기') {
          //
        } else if (label == '삭제하기') {
          return;
        }
      },
    });

    this.ImgBox = new ImgBox({
      type: 'gradient',
      imageURL: this._state.images[this._state.imageIndex],
      onClick: () => {
        console.log('img-gradient');
      },
    });

    this.ImgNav = new ImgNav({
      navCount: this._state.images.length,
      onClick: (navPosition) => {
        this._state.imageIndex = navPosition;

        this.ImgNav.setState({ navPosition });
        this.ImgBox.setState({ imageURL: this._state.images[this._state.imageIndex] });
      },
    });

    this.ButtonStatus = new ButtonStatus({
      buttonText: '판매중',
      onClick: () => {
        console.log('status');
      },
    });

    this.InfoSaler = new InfoSaler({
      name: this._state.saler.name,
      place: this._state.saler.location,
    });

    this.ProductBar = new ProductBar({
      price: this._state.price != null ? this._state.price : '가격 미정',
      buttonName:
        this._props.userType === 'sell' ? `채팅 목록 보기(${this._state.count.chat})` : `문의하기`,
      onClick: this._props.userType === 'sell' ? this.onClickChatList : null,
    });

    this.render();
    this.addEvent();
  }

  onClickChatList = () => {
    console.log('move');
    this.ChatPage.togglePage();
  };

  setState = (nextState) => {
    this.render();
  };

  render = () => {
    this.$dom.innerHTML = `
      <div class="${styles['header-wrapper']}">
        <div class="ImgBox"></div>
        <div class="Header"></div>
        <div class="ImgNav"></div>
      </div>
      <main class="${styles['page-main']}">
        <div class="ButtonStatus"></div>
        <div class="${styles['title']}">${this._state.title}</div>
        <div class="${styles['info']}">${this._state.category} · ${getTimeStamp(
      this._state.createdDatetime,
    )}
        </div>
        <div class="${styles['content']}">${this._state.content}</div>
        <div class="${styles['status']}">
          채팅 ${this._state.count.chat} · 관심 ${this._state.count.watch} · 조회 ${
      this._state.count.views
    }
        </div>
        <div class="InfoSaler"></div>
      </main>
      <div class="ProductBar"></div>
      <div class="${styles['drop-down-wrapper']}">
        <div class="DropDown"></div>
      </div>
    `;

    if (this._props.userType === 'sell') {
      this.replaceElement(this.$dom.querySelector('.ButtonStatus'), this.ButtonStatus.$dom);
      this.replaceElement(this.$dom.querySelector('.DropDown'), this.DropDown.$dom);
    }

    this.replaceElement(this.$dom.querySelector('.ImgBox'), this.ImgBox.$dom);
    this.replaceElement(this.$dom.querySelector('.Header'), this.Header.$dom);
    this.replaceElement(this.$dom.querySelector('.ImgNav'), this.ImgNav.$dom);
    this.replaceElement(this.$dom.querySelector('.InfoSaler'), this.InfoSaler.$dom);
    this.replaceElement(this.$dom.querySelector('.ProductBar'), this.ProductBar.$dom);
  };

  toggleOption = () => {
    const $dropDownWrapper = this.$dom.querySelector(`.${styles['drop-down-wrapper']}`);
    $dropDownWrapper.classList.toggle(styles.show);
  };

  addEvent = () => {
    const $dropDownWrapper = this.$dom.querySelector(`.${styles['drop-down-wrapper']}`);
    this.$dom.addEventListener('click', (e) => {
      if (e.target === $dropDownWrapper) {
        this.toggleOption();
      }
    });
  };
}
